import { describe, expect, test, type TestBody } from 'claude-code/testing'

import { fileUrl, fromFileUrl, linkify, type Found } from '../hooks/linkify'

// what exists on the fake disk, by absolute path
const DISK: Record<string, Found['kind']> = {
  'C:\\work\\app\\README.md': 'file',
  'C:\\work\\app\\src': 'dir',
  'C:\\work\\app\\src\\deploy.ps1': 'file',
  'C:\\work\\app\\reports\\Quarterly Report.xlsx': 'file',
  'C:\\work\\app\\.config\\tools\\NOTES.md': 'file',
}

const fake = async (spelled: string): Promise<Found | undefined> => {
  const abs = /^[A-Za-z]:/.test(spelled) ? spelled : `C:\\work\\app\\${spelled}`
  const path = abs.replace(/\//g, '\\').replace(/\\$/, '')
  const kind = DISK[path]

  return kind ? { path, kind } : undefined
}

describe('linkify', () => {
  test('links an absolute path in prose, keeping the sentence dot outside', async () => {
    const { text, links } = await linkify('Saved to C:\\work\\app\\README.md.', fake)
    expect(text).toBe('Saved to [C:\\\\work\\\\app\\\\README.md](file:///C:/work/app/README.md).')
    expect(links.get('file:///C:/work/app/README.md')?.kind).toBe('file')
  })

  test('links a whole code span, with spaces and a line number', async () => {
    const { text } = await linkify('See `C:\\work\\app\\reports\\Quarterly Report.xlsx` and `src\\deploy.ps1:19`', fake)
    expect(text).toBe(
      'See [`C:\\work\\app\\reports\\Quarterly Report.xlsx`](file:///C:/work/app/reports/Quarterly%20Report.xlsx)' +
        ' and [`src\\deploy.ps1:19`](file:///C:/work/app/src/deploy.ps1)',
    )
  })

  test('keeps a dotted folder in the label', async () => {
    const { text } = await linkify('in .config\\tools\\NOTES.md', fake)
    expect(text).toContain('[.config\\\\tools\\\\NOTES.md](file:///C:/work/app/.config/tools/NOTES.md)')
  })

  test('leaves fences, URLs, commands and missing files alone', async () => {
    const reply = [
      '```powershell',
      '& C:\\work\\app\\README.md',
      '```',
      'Open https://example.com/docs/README.md or run `& C:\\work\\app\\README.md -Force`.',
      'Nothing at C:\\work\\app\\nope.txt and/or 10/21.',
    ].join('\n')
    const { text, links } = await linkify(reply, fake)
    expect(text).toBe(reply)
    expect(links.size).toBe(0)
  })

  test('points an existing markdown link at the file', async () => {
    const { text } = await linkify('[the readme](README.md) and [site](https://example.com/README.md)', fake)
    expect(text).toBe('[the readme](file:///C:/work/app/README.md) and [site](https://example.com/README.md)')
  })

  test('file URLs round-trip', () => {
    const path = 'C:\\work\\a (1)\\b#c.txt'
    expect(fileUrl(path)).toBe('file:///C:/work/a%20%281%29/b%23c.txt')
    expect(fromFileUrl(fileUrl(path))).toBe(path)
    expect(fileUrl('/home/me/x.md')).toBe('file:///home/me/x.md')
  })
})

const REPLY = {
  plugin: 'file-links',
  component: 'AssistantMessage',
  requestId: 'msg-1',
  props: { text: 'Notes: `C:\\work\\app\\README.md` and script C:\\work\\app\\x.bat', isFirstOfReply: true },
} as const

function host(on: Parameters<TestBody>[1], runs: { argv: readonly string[]; env?: Record<string, string> }[]) {
  on('session.cwd', () => ({ value: 'C:\\work\\app' }))
  on('session.root', () => ({ value: 'C:\\work\\app' }))
  on('clock.now', () => ({ value: 1 }))
  on('env.get', () => ({ value: 'C:\\Users\\me' }))
  on('fs.exists', () => ({ value: false }))
  on('fs.stat', (_, e) =>
    /README\.md$|x\.bat$/.test(e.path)
      ? { value: { kind: 'file', size: 1, mtimeMs: 0, isLink: false } }
      : { deny: 'ENOENT' },
  )
  on('process.run', (_, e) => {
    runs.push({ argv: e.argv, env: e.init?.env })
    const mode = e.init?.env?.FILE_LINKS_MODE

    return { value: { exitCode: 0, stdout: mode === 'edit' ? 'reveal' : 'open', stderr: '', isStdoutTruncated: false, isStderrTruncated: false } }
  })
  on('ui.toast', () => ({ value: undefined }))
}

test('fullscreen: a click opens the file with its default app, a .bat only in its editor', async ($, on) => {
  const runs: { argv: readonly string[]; env?: Record<string, string> }[] = []
  host(on, runs)

  const ui = await $.ui.mount({ ...REPLY, surface: 'terminal', viewport: { columns: 120, rows: 40, isFullscreen: true } })
  const md = await ui.find({ key: 'reply' })
  expect(md?.text).toContain('(file:///C:/work/app/README.md)')
  expect(md?.text).toContain('(file:///C:/work/app/x.bat)')
  expect(await ui.find({ type: 'Text', text: '\u25CF' })).toBeDefined()

  await ui.press({ key: 'reply', link: { href: 'file:///C:/work/app/README.md' } })
  await ui.press({ key: 'reply', link: { href: 'file:///C:/work/app/x.bat' } })
  expect(runs.map(r => [r.argv[0], r.env?.FILE_LINKS_PATH, r.env?.FILE_LINKS_MODE])).toEqual([
    ['powershell.exe', 'C:\\work\\app\\README.md', 'open'],
    ['powershell.exe', 'C:\\work\\app\\x.bat', 'edit'],
  ])
  await ui.unmount()
})

test('main screen: the engine draws the reply with file: links for the terminal to open', async ($, on) => {
  host(on, [])
  // stands for the engine beneath the plugin
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>{e.component === 'AssistantMessage' ? e.props.text : ''}</Text>
  })

  const ui = await $.ui.mount({ ...REPLY, surface: 'terminal', viewport: { columns: 120, rows: 40, isFullscreen: false } })
  expect((await ui.find({ type: 'Text' }))?.text).toBe(
    'Notes: [`C:\\work\\app\\README.md`](file:///C:/work/app/README.md) and script [C:\\\\work\\\\app\\\\x.bat](file:///C:/work/app/x.bat)',
  )
  await ui.unmount()
})
