---
name: hermes-tweet
description: Use when a task needs Hermes Agent to search, read, monitor, or manage X/Twitter workflows with Hermes Tweet.
---

# /hermes-tweet:hermes-tweet - Hermes Agent X/Twitter Workflow

user-invocable: true
disable-model-invocation: true
allowed-tools: Bash, Read

## Description

Install and operate Hermes Tweet, the native Hermes Agent plugin for X/Twitter
research, account reads, social monitoring, giveaway audits, and controlled
account actions.

## Instructions

Use this skill when a task needs Hermes Agent to work with X/Twitter through
Hermes Tweet.

### Install

Prefer the native Hermes plugin installer:

```bash
hermes plugins install Xquik-dev/hermes-tweet --enable
```

If Hermes cannot prompt interactively, set `XQUIK_API_KEY` in the runtime
environment or `~/.hermes/.env`, then reload or restart active Hermes sessions.

### Operating Rules

1. Start with `tweet_explore` to find a catalog route before calling an
   endpoint.
2. Use `tweet_read` for search, profile, trend, monitor, media, draw, and
   export reads after `XQUIK_API_KEY` is configured.
3. Keep `tweet_action` unavailable by default.
4. Enable `HERMES_TWEET_ENABLE_ACTIONS=true` only for sessions with explicit
   approval to post, reply, like, retweet, follow, DM, create monitors, send
   webhooks, or change account state.
5. Never put API keys, account credentials, cookies, or tokens in prompts, tool
   arguments, issue bodies, PR comments, or generated docs.
6. For remote gateway profiles, install Hermes Tweet and configure environment
   variables on the remote Hermes host because plugin code executes there.

### Good Fits

- Social listening and trend research
- Creator, brand, or competitor research
- Support triage from public mentions and timelines
- Giveaway and community audits
- Launch monitoring from read-only routes
- Controlled publishing with explicit approval gates

### References

- Hermes Tweet: https://github.com/Xquik-dev/hermes-tweet
- PyPI package: https://pypi.org/project/hermes-tweet/
- Hermes Agent: https://github.com/NousResearch/hermes-agent
