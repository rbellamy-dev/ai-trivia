# Snapshot Trivia

A photo trivia game. Pick a topic, answer ten AI-written questions, each with its own photo, and see how you did on a contact sheet.

Built with Next.js, React, TypeScript, Tailwind CSS and the Vercel AI SDK.

## Highlights

- **Questions stream in.** The first one is playable in about two seconds while the rest are still being written.
- **Quality checks.** The server drops any question that repeats or gives away its own answer.
- **A built-in photo library.** 100 AI-generated photos ship with the app, so there are no image APIs or rate limits. A photo never repeats in a round and never hints at the answer.
- **Accessible.** Keyboard play, screen-reader announcements and reduced-motion support.

## Run it

```bash
npm install
echo "OPENAI_API_KEY=sk-..." > .env.local
npm run dev   # http://localhost:3000
```

`npm test` runs the unit tests.

## How to play

1. Pick a topic: Science & Nature, History, Geography or Biology.
2. Answer ten questions. Press A–D to answer, Enter for the next question, Esc to leave.
3. On the contact sheet, tap any photo to see its question and answer.

See [DESIGN.md](DESIGN.md) for the design system and decisions.
