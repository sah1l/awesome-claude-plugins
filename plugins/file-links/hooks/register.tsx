import type { EngineInterface, Register } from 'claude-code'

import { fromFileUrl, linkify, type Found } from './linkify'

// types the OS would run on a double-click: open them in their editor, else show them in the folder
const RUNNABLE =
  /\.(exe|com|bat|cmd|msi|msp|scr|pif|cpl|hta|jar|lnk|url|reg|inf|vbs|vbe|js|jse|wsf|wsh|ps1|psm1|psd1|py|pyw|sh|appref-ms|application|msc|scf)$/i
// how long a path that was not there stays unlinked before it is looked up again
const MISSING_MS = 10_000

// FILE_LINKS_MODE: open = the type's default app (a folder opens in Explorer), edit = its Edit verb
const OPEN_PS = [
  "$ErrorActionPreference = 'Stop'",
  '$p = $env:FILE_LINKS_PATH',
  "if ($env:FILE_LINKS_MODE -eq 'edit') {",
  "  try { Start-Process -FilePath $p -Verb Edit; 'edit' }",
  "  catch { Start-Process -FilePath explorer.exe -ArgumentList ('/select,\"{0}\"' -f $p); 'reveal' }",
  "} else { Invoke-Item -LiteralPath $p; 'open' }",
].join('\n')

type Host = { isWindows: boolean; isMac: boolean; home?: string; dirs: string[] }

let base: Omit<Host, 'dirs'> | undefined
const seen = new Map<string, { found?: Found; at: number }>()

export const register: Register = on => {
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    if (e.surface !== 'terminal') return next(e)

    const env = await host($)
    const now = await $.clock.now()
    const { text, links } = await linkify(e.props.text, spelled => lookup($, env, now, spelled))

    if (links.size === 0) return next(e)
    // clicks reach a mod only in the fullscreen terminal; elsewhere the terminal opens the file: link
    if (e.props.isSummary || e.viewport?.isFullscreen !== true) {
      return next({ ...e, props: { ...e.props, text } })
    }

    const { Box, Text, Markdown } = $.ui.resolve(e)

    // the engine's own layout for a reply's text, with a Markdown whose file links this mod opens
    return (
      <Box alignItems="flex-start" flexDirection="row" marginTop={1} width="100%">
        {e.props.isFirstOfReply && (
          <Box minWidth={2}>
            <Text color="text">{env.isMac ? '⏺' : '●'}</Text>
          </Box>
        )}
        <Box flexDirection="column" flexGrow={1}>
          <Markdown
            key="reply"
            text={text}
            pressableLinks={[...links.keys()].slice(0, 256)}
            onLinkPress={link => open($, links.get(link.href)?.path ?? fromFileUrl(link.href))}
          />
        </Box>
      </Box>
    )
  })
}

async function host($: EngineInterface): Promise<Host> {
  const [cwd, root] = await Promise.all([$.session.cwd(), $.session.root()])
  if (!base) {
    const isWindows = /^[A-Za-z]:[\\/]/.test(cwd)
    base = {
      isWindows,
      isMac: !isWindows && (await $.fs.exists('/System/Library/CoreServices')),
      home: isWindows ? await $.env.get('USERPROFILE') : await $.env.get('HOME'),
    }
  }

  return { ...base, dirs: [...new Set([cwd, root])] }
}

// where a spelled path may live, absolute
function places(spelled: string, env: Host): string[] {
  if (/^[A-Za-z]:[\\/]/.test(spelled)) return [spelled]
  const bash = /^\/([A-Za-z])(?:\/(.*))?$/.exec(spelled)
  if (env.isWindows && bash?.[1]) return [`${bash[1].toUpperCase()}:/${bash[2] ?? ''}`]
  if (/^[\\/]/.test(spelled)) return env.isWindows ? [] : [spelled]
  if (/^~[\\/]/.test(spelled)) return env.home ? [env.home + spelled.slice(1)] : []

  return env.dirs.map(dir => `${dir}/${spelled}`)
}

function normal(path: string, isWindows: boolean): string {
  const sep = isWindows ? '\\' : '/'
  const [head, ...segs] = path.split(/[\\/]+/)
  const parts: string[] = []
  for (const s of segs) {
    if (s === '..') parts.pop()
    else if (s !== '.' && s !== '') parts.push(s)
  }

  return head + sep + parts.join(sep)
}

async function lookup($: EngineInterface, env: Host, now: number, spelled: string): Promise<Found | undefined> {
  for (const place of places(spelled, env)) {
    const path = normal(place, env.isWindows)
    const hit = seen.get(path)
    if (hit?.found) return hit.found
    if (hit && now - hit.at < MISSING_MS) continue

    const stat = await $.fs.stat(path).catch(() => undefined)
    const found: Found | undefined = stat && stat.kind !== 'other' ? { path, kind: stat.kind } : undefined
    seen.set(path, { found, at: now })
    if (found) return found
  }

  return undefined
}

async function open($: EngineInterface, path: string | undefined): Promise<void> {
  if (!path) return
  const name = path.split(/[\\/]/).filter(Boolean).pop() ?? path
  try {
    const stat = await $.fs.stat(path).catch(() => undefined)
    if (!stat) {
      $.ui.toast(`${name} is not there any more`)
      return
    }
    const isRunnable = stat.kind === 'file' && RUNNABLE.test(path)
    const env = await host($)

    if (env.isWindows) {
      const ran = await $.process.run(['powershell.exe', '-NoProfile', '-NonInteractive', '-Command', OPEN_PS], {
        env: { FILE_LINKS_PATH: path, FILE_LINKS_MODE: isRunnable ? 'edit' : 'open' },
      })
      if (ran.exitCode !== 0) throw new Error(ran.stderr.trim() || `exit code ${ran.exitCode}`)
      if (ran.stdout.trim() === 'reveal') $.ui.toast(`${name} would run if opened, so it is shown in its folder`)
    } else if (env.isMac) {
      await $.process.run(isRunnable ? ['open', '-R', path] : ['open', path])
    } else {
      await $.process.run(['xdg-open', isRunnable ? path.replace(/\/[^/]*$/, '') || '/' : path])
    }
  } catch (err) {
    $.ui.toast(`Could not open ${name}: ${err instanceof Error ? err.message : String(err)}`)
  }
}
