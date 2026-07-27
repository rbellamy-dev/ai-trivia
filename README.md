# trivia-game

A five-question trivia game built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — lint the project

## Structure

- `src/app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/` — game UI (`Trivia`, `TriviaQuestion`, `TriviaAnswers`, `TriviaButton`, `FinalScore`)
- `src/data/questions.ts` — the question set
- `public/` — medal and background SVG assets
