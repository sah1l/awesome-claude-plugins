// Finds file paths in a reply's markdown and turns the ones that exist into file: links.
// Fenced code blocks, URLs and existing links are left alone; an inline code span is
// linked only when the whole span is a path.

export type Found = { path: string; kind: 'file' | 'dir' }
export type Lookup = (spelled: string) => Promise<Found | undefined>
export type Linked = { text: string; links: Map<string, Found> }

const MAX_LOOKUPS = 200

// a line number after a path: x.ts:42, x.ts:42:7, x.ts:10-20, x.md#L5
const LINE = String.raw`(?::\d+(?:[:-]\d+)?|#L\d+(?:-L?\d+)?)?`
// a character of a path written in prose: no space, quote, colon, or markdown/list punctuation
const CH = String.raw`[^\s\`'"<>|*?()\[\]{},;:]`
const SEG = String.raw`[\w.$@+~-]+`
const SHAPE =
  String.raw`[A-Za-z]:[\\/]${CH}*` + // C:\work\app\build.ps1
  String.raw`|~[\\/]${CH}*` + // ~/notes.md
  String.raw`|\.{1,2}[\\/]${CH}*` + // ./x, ..\x
  String.raw`|[\\/]${SEG}(?:[\\/]${CH}*)?` + // /c/Users/x, /etc/hosts
  String.raw`|${SEG}(?:[\\/]${SEG})+[\\/]?` + // src\main.py, scripts/
  String.raw`|[\w-][\w.-]*\.[A-Za-z][A-Za-z0-9]{0,7}` // README.md

const PROSE = new RegExp(String.raw`(?<![\w/\\.~$@+-])(${SHAPE})(${LINE})(?![\w\\/])`, 'g')
// a whole code span or link target; an absolute path may hold spaces there
const WHOLE = new RegExp(String.raw`^(${SHAPE}|[A-Za-z]:[\\/][^\`<>|*?"\n:]*)(${LINE})$`)
// code span | [label](target) | <autolink> | bare URL
const TOKEN = /(`+)(.+?)\1(?!`)|(!?\[[^\]\n]*\])\(([^()\s]+)\)|<[^<>\s]+>|\b(?:https?|ftp|file|mailto):[^\s<>]*/gi
const FENCE = /^ {0,3}(`{3,}|~{3,})/
const SCHEME = /^[a-z][a-z0-9+.-]+:/i

type Href = (spelled: string) => string | undefined

export async function linkify(text: string, lookup: Lookup): Promise<Linked> {
  const asked = new Set<string>()
  rewrite(text, spelled => {
    asked.add(spelled)
    return undefined
  })

  const found = new Map<string, Found>()
  await Promise.all(
    [...asked].slice(0, MAX_LOOKUPS).map(async spelled => {
      const hit = await lookup(spelled).catch(() => undefined)
      if (hit) found.set(spelled, hit)
    }),
  )

  const links = new Map<string, Found>()
  const out = found.size === 0 ? text : rewrite(text, spelled => {
    const hit = found.get(spelled)
    if (!hit) return undefined
    const href = fileUrl(hit.path)
    links.set(href, hit)
    return href
  })

  return { text: out, links }
}

export function fileUrl(path: string): string {
  const p = path.replace(/\\/g, '/')
  const drive = /^[A-Za-z]:/.exec(p)?.[0] ?? ''
  const rest = p
    .slice(drive.length)
    .split('/')
    .map(seg => encodeURIComponent(seg).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`))
    .join('/')

  return `file://${drive ? `/${drive}` : ''}${rest}`
}

export function fromFileUrl(href: string): string | undefined {
  const m = /^file:\/\/\/?(.*)$/i.exec(href)
  if (!m) return undefined
  const p = decodeURIComponent(m[1] ?? '')

  return /^[A-Za-z]:/.test(p) ? p.replace(/\//g, '\\') : `/${p}`
}

function rewrite(text: string, href: Href): string {
  let fence = ''

  return text
    .split('\n')
    .map(line => {
      const mark = FENCE.exec(line)?.[1]
      if (fence) {
        if (mark && mark[0] === fence[0] && mark.length >= fence.length && line.trim() === mark) fence = ''
        return line
      }
      if (mark) {
        fence = mark
        return line
      }
      return inline(line, href)
    })
    .join('\n')
}

function inline(line: string, href: Href): string {
  let out = ''
  let at = 0
  for (const m of line.matchAll(TOKEN)) {
    out += prose(line.slice(at, m.index), href)
    if (m[1] !== undefined) out += span(m[0], m[2] ?? '', href)
    else if (m[3] !== undefined) out += target(m[0], m[3], m[4] ?? '', href)
    else out += m[0]
    at = m.index + m[0].length
  }

  return out + prose(line.slice(at), href)
}

function prose(s: string, href: Href): string {
  return s.replace(PROSE, (all: string, spelled: string, line: string) => {
    const path = spelled.replace(/\.+$/, '')
    const to = path ? href(path) : undefined
    if (!to) return all
    // trailing dots are the sentence's, not the path's
    const label = path === spelled ? path + line : path

    return `[${escape(label)}](${to})${all.slice(label.length)}`
  })
}

function span(raw: string, content: string, href: Href): string {
  const path = WHOLE.exec(content.trim())?.[1]
  const to = path ? href(path) : undefined

  return to ? `[${raw}](${to})` : raw
}

function target(raw: string, label: string, dest: string, href: Href): string {
  if (SCHEME.test(dest)) return raw
  const path = WHOLE.exec(dest)?.[1]
  const to = path ? href(path) : undefined

  return to ? `${label}(${to})` : raw
}

function escape(s: string): string {
  return s.replace(/[\\`*_~\[\]<>|]/g, '\\$&')
}
