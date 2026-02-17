# Contributing to Awesome Claude Plugins

Thanks for your interest in contributing! Here's how to get started.

## Adding a New Plugin

1. Create a directory under `plugins/<your-plugin-name>/`
2. Add `.claude-plugin/plugin.json` with your plugin metadata
3. Add skills under `skills/<skill-name>/SKILL.md`
4. Add your plugin to `.claude-plugin/marketplace.json`
5. Test locally:
   ```bash
   claude plugin marketplace add ./
   claude plugin install <your-plugin>@awesome-claude-plugins
   ```
6. Submit a PR

### Plugin Structure

```
plugins/<your-plugin>/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── <skill-name>/
        ├── SKILL.md
        └── references/        # optional supporting files
            └── ...
```

### SKILL.md Headers

Every skill must include these headers at the top:

```
user-invocable: true
disable-model-invocation: true
allowed-tools: Read
```

Add additional tools to `allowed-tools` only if the skill needs them (e.g., `Bash` for git commands, `Glob` for file discovery).

## Modifying an Existing Plugin

1. Make your changes
2. Bump the `version` in `plugins/<name>/.claude-plugin/plugin.json`
3. Test locally
4. Submit a PR

## Adding a Roast Persona

1. Edit `plugins/roast-my-code/skills/roast/references/personas.md`
2. Follow the existing format — each persona needs:
   - **Name and shortname** (the `--persona` flag value)
   - **Voice description**
   - **5 catchphrases**
   - **Signature style**
   - **Example roast snippet**
3. If personas are inlined in SKILL.md files, update those too
4. Test with `/roast-my-code:roast <file> --persona=<your-persona>`
5. Submit a PR

## Guidelines

- Keep skills focused — one skill should do one thing well
- Use `allowed-tools` in SKILL.md to avoid permission prompts for reference files
- Use realistic placeholder data in examples, not "Lorem ipsum"
- Test your changes locally before submitting a PR
