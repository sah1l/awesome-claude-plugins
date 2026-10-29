# Awesome Claude Plugins

A curated collection of awesome Claude Code plugins. Zero infrastructure, zero API costs — everything runs inside your Claude Code session.

## Installation

Register the marketplace, then install whichever plugins you want:

```bash
claude plugin marketplace add sah1l/awesome-claude-plugins
```

```bash
# Install individual plugins
claude plugin install roast-my-code@awesome-claude-plugins
claude plugin install mockdown@awesome-claude-plugins
claude plugin install file-links@awesome-claude-plugins
```

### Local Development

```bash
git clone https://github.com/sah1l/awesome-claude-plugins.git
claude plugin marketplace add ./awesome-claude-plugins
claude plugin install roast-my-code@awesome-claude-plugins
claude plugin install mockdown@awesome-claude-plugins
claude plugin install file-links@awesome-claude-plugins
```

## Updating

Pull the latest changes, then run:

```bash
claude plugin update roast-my-code@awesome-claude-plugins
claude plugin update mockdown@awesome-claude-plugins
claude plugin update file-links@awesome-claude-plugins
```

## Making Changes

If you update a plugin, bump the `version` in its `plugins/<name>/.claude-plugin/plugin.json`.

---

## Plugins

### Roast My Code

Get your code brutally roasted by hilarious personas with real code review value.

| Command | Description |
|---------|-------------|
| `/roast-my-code:roast <file> [--persona=<name>]` | Roast a single file |
| `/roast-my-code:roast-pr [--staged] [--persona=<name>]` | Roast your pending changes |
| `/roast-my-code:roast-repo [--persona=<name>]` | Roast an entire repository |
| `/roast-my-code:roast-battle <file1> <file2> [--persona=<name>]` | Head-to-head file battle |

**12 personas available:**

| Persona | Flag | Style |
|---------|------|-------|
| Gordon Ramsay | `--persona=ramsay` | Explosive chef. "This code is RAW!" |
| Shakespeare | `--persona=shakespeare` | Iambic pentameter and tragic soliloquies |
| Code Therapist | `--persona=therapist` | Passive-aggressive validation |
| Museum Curator | `--persona=curator` | Pretentious art critic energy |
| Code Obituary | `--persona=obituary` | Somber eulogy for your dead code |
| Straight Shooter | `--persona=straight` | Witty senior engineer, direct but funny |
| Drill Sergeant | `--persona=drill` | "DROP AND GIVE ME 20 REFACTORS!" |
| D&D Dungeon Master | `--persona=dm` | RPG narration with skill checks |
| Nature Doc Narrator | `--persona=attenborough` | David Attenborough observes your code |
| Film Noir Detective | `--persona=noir` | Cynical gumshoe on the case |
| Pirate Captain | `--persona=pirate` | Nautical metaphors and sea shanty energy |
| Yoda | `--persona=yoda` | "Refactored, this must be." |

Omit `--persona` for a random persona each time.

**Example Score Card:**

```
+----------------------------------------------------------+
|                    ROAST SCORE CARD                      |
+----------------------------------------------------------+
|                                                          |
|  Code Smell      [########............]  42/100  (25%)   |
|  Architecture    [##############......]  68/100  (25%)   |
|  Security        [####................]  22/100  (20%)   |
|  Maintainability [##########..........]  51/100  (15%)   |
|  WTF Factor      [##################..]  88/100  (15%)   |
|                                                          |
|  --------------------------------------------------------|
|  OVERALL: 52/100                             Grade: D    |
|                                                          |
+----------------------------------------------------------+
```

---

### Mockdown

Generate ASCII wireframes from UI descriptions. Describe your UI in plain English or point to a PRD.

| Command | Description |
|---------|-------------|
| `/mockdown:mockdown <description or file path>` | Generate an ASCII wireframe |

**Example:**

```
/mockdown:mockdown admin dashboard with sidebar, stat cards, and user table
```

Produces clean ASCII wireframes with layout annotations:

```
+------------------------------------------------------------------------+
|   Logo          Dashboard              [ Search...       ]  [ Profile ]|
+---------------+--------------------------------------------------------+
|               |                                                        |
|  Navigation   |  +--------------+ +--------------+ +--------------+    |
|               |  | Total Users  | | Revenue      | | Active Now   |    |
|  * Dashboard  |  |    1,234     | |   $45,678    | |      89      |    |
|  * Users      |  |   ^ 12%      | |   ^ 8%       | |   v 3%       |    |
|  * Settings   |  +--------------+ +--------------+ +--------------+    |
|               |                                                        |
+---------------+--------------------------------------------------------+
```

---

### File Links

Makes file paths in Claude's replies clickable. A click opens the file in the app your OS assigns to its type: a spreadsheet in Excel, a PDF in your PDF reader, a folder in Explorer or Finder.

It is a mod (a hooks module with no skills or commands), so there is nothing to invoke. Install it and new replies show their file paths as links.

```
● Saved the report to C:\work\app\reports\Q3.xlsx
                      ^ click to open it in Excel
```

**What gets linked:**
- Paths that exist on disk: absolute (`C:\work\app\report.xlsx`, `/home/me/notes.md`), relative to the project (`src/main.py`), `~/...` and Git Bash style `/c/Users/...`
- A line number after a path (`src/main.py:42`) stays in the label and is dropped when the file opens
- Markdown links whose target is a file path
- Nothing inside code blocks. An inline code span is linked only when it holds nothing but a path.

**Clicking:**
- In the fullscreen terminal (`"tui": "fullscreen"` in settings), a plain click opens the file. Ctrl+click still does what your terminal does.
- Outside fullscreen, paths become `file:///` links and your terminal opens them.
- Files that would run when opened (`.bat`, `.exe`, `.ps1`, `.py`, `.sh`, `.reg` and similar) are never run. They open in their editor where the OS has one, otherwise their folder opens with the file selected.

Files open with `Invoke-Item` on Windows, `open` on macOS and `xdg-open` on Linux. Built and tested on Windows. The macOS and Linux paths are untested.

---

## Contributing

1. Fork the repo
2. Add or modify a plugin under `plugins/<name>/`
3. Update `marketplace.json` if adding a new plugin
4. Test locally with `claude plugin marketplace add ./`
5. Submit a PR

## License

MIT
