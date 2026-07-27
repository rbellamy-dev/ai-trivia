# AI Trivia

A single-screen trivia game with a serene night-sky theme: pick a category, answer ten AI-generated questions one at a time, and watch a constellation draw itself as you go, gold for a hit, faded for a miss. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Questions are generated on demand with the **Vercel AI SDK** (`generateObject`) via OpenAI `gpt-4o-mini`.

## Getting started

```bash
npm install

# the question API needs an OpenAI key
echo "OPENAI_API_KEY=sk-..." > .env.local

npm run dev      # http://localhost:3000
```

Without `OPENAI_API_KEY`, category selection surfaces a friendly error and a "Try Again" action; the rest of the UI still runs.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — lint the project

## How it plays

1. **Select** a category (Science & Nature, History, Geography, Pop Culture).
2. **Play** ten questions; each answer locks in and lights a star in the constellation progress meter.
3. **Finale** grades your run: Supernova (>=90%), Rising Star (>=70%), or Stardust, with a star medal and your best score (stored in `localStorage`). Replay the same category with **Play again** or return to the picker with **New subject**.

Fully keyboard-operable (Tab between answers, Enter to select), respects `prefers-reduced-motion`, and targets WCAG 2.1 AA contrast.

## Design system

The visual language ("Constellation" / North Star: *The Observatory*) is documented and tokenized:

- `PRODUCT.md` — register, audience, brand personality, anti-references, design principles
- `DESIGN.md` — colors, typography, elevation, components, do's and don'ts (Stitch DESIGN.md format)
- `.impeccable/design.json` — machine-readable sidecar (tonal ramps, motion, component snippets)
- Design tokens live in `src/app/globals.css` as a Tailwind v4 `@theme` block; components reference tokens, not raw hex.
- `design/` — the standalone HTML theme explorations, including `variation-4-constellation.html`, the source of this theme.

## Structure

- `src/app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/app/api/questions/route.ts` — AI question generation (POST `{ category }` → 10 questions)
- `src/components/` — game UI: `Trivia` (orchestrator), `NightSky`, `Constellation`, `CategorySelect`, `CategoryIcon`, `TriviaQuestion`, `TriviaAnswers`, `TriviaButton`, `FinalScore`, `StarMedal`
- `src/hooks/` — `useTrivia` (game state machine), `useScoreHistory` (best-score persistence)
- `src/data/` — `categories.ts`, `types.ts`
