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
```

### Local Development

```bash
git clone https://github.com/sah1l/awesome-claude-plugins.git
claude plugin marketplace add ./awesome-claude-plugins
claude plugin install roast-my-code@awesome-claude-plugins
claude plugin install mockdown@awesome-claude-plugins
```

## Updating

Pull the latest changes, then run:

```bash
claude plugin update roast-my-code@awesome-claude-plugins
claude plugin update mockdown@awesome-claude-plugins
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
|                    ROAST SCORE CARD                       |
+----------------------------------------------------------+
|                                                          |
|  Code Smell      [########............]  42/100  (25%)   |
|  Architecture    [##############......]  68/100  (25%)   |
|  Security        [####................]  22/100  (20%)   |
|  Maintainability [##########..........]  51/100  (15%)   |
|  WTF Factor      [##################..]  88/100  (15%)   |
|                                                          |
|  -------------------------------------------------------  |
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
|   Logo          Dashboard              [ Search...       ]  [ Profile ] |
+---------------+--------------------------------------------------------+
|               |                                                        |
|  Navigation   |  +--------------+ +--------------+ +--------------+    |
|               |  | Total Users  | | Revenue      | | Active Now   |    |
|  * Dashboard  |  |    1,234     | |   $45,678    | |      89      |    |
|  * Users      |  |   ^ 12%     | |   ^ 8%       | |   v 3%       |    |
|  * Settings   |  +--------------+ +--------------+ +--------------+    |
|               |                                                        |
+---------------+--------------------------------------------------------+
```

---

## Contributing

1. Fork the repo
2. Add or modify a plugin under `plugins/<name>/`
3. Update `marketplace.json` if adding a new plugin
4. Test locally with `claude plugin marketplace add ./`
5. Submit a PR

## License

MIT
