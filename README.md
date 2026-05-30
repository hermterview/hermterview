# Hermterview

Quartz + GitHub Pages site for public-safe backend interview study notes.

Miras writes cleaned Markdown into `content/`. Quartz builds the Obsidian-style public site from that folder.

## Local Preview

```bash
npm ci
npx quartz plugin install
npx quartz build --serve
```

## Publish Flow

```text
Miras /interview publish
-> content/index.md, content/sessions, content/topics, content/review
-> git commit && git push
-> GitHub Actions builds Quartz
-> GitHub Pages serves the site
```

## Privacy Rules

- Do not commit raw audio.
- Do not commit raw transcripts.
- Do not commit private personal feedback.
- Keep `PUBLISH_RAW_TRANSCRIPTS=false`.
- Keep `PUBLISH_PARTICIPANT_NAMES=false` unless every participant explicitly agrees.
