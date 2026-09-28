# Card Table

A single-screen trivia game played as a hand of cards on green felt: pick a deck, answer ten AI-generated questions one hand at a time, and watch the draw pile empty and the played pile fill as you go, mint for a hit, coral for a miss. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

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

1. **Pick a deck** (♣ Science & Nature, ♦ History, ♥ Geography, ♠ Pop Culture).
2. **Play** ten hands; each answer locks in, the question card is stamped HIT or MISS, and a mini-card lands on the played pile.
3. **Finale** names your hand: Royal Flush (10/10), Full House (8+), Straight (6+), Two Pair (4+) or High Card, with the ten played cards and your best hand (stored in `localStorage`). Replay the same deck with **Deal {deck} again** or return to the picker with **Pick another deck**. Pick the **Joker** deck for a mix of all four topics. You can **Fold** mid-round, and A–D / 1–4 play a card, Enter deals the next.

Fully keyboard-operable (Tab between answers, Enter to select), respects `prefers-reduced-motion`, and targets WCAG 2.1 AA contrast.

## Structure

- `src/app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/app/api/questions/route.ts` — AI question generation (POST `{ category }` → 10 questions)
- `src/components/` — game UI: `Trivia` (orchestrator), `FeltTable`, `CardPiles`, `ScoreChip`, `CategorySelect`, `CategoryIcon`, `TriviaQuestion`, `TriviaAnswers`, `TriviaButton`, `FinalScore`
- `src/hooks/` — `useTrivia` (game state machine), `useScoreHistory` (best-score persistence)
- `src/data/` — `categories.ts`, `types.ts`
