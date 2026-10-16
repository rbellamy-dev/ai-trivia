# Product

## Register

product

## Users

Two audiences at once. The primary audience is people evaluating the maker's craft: recruiters, hiring managers, and peers who open the app for two minutes and judge taste, polish, and attention to detail. The secondary audience is casual players on any device who just want a quick, good-looking trivia round. Both meet the same surface, so it has to read as a finished, considered product on first glance and still be genuinely fun to play through ten questions.

## Product Purpose

A single-screen trivia game laid out on a photographer's light table: choose a topic (Science & Nature, History, Geography or Biology), answer ten AI-written questions, each shown with a scene-setting photo print, and finish on a contact sheet of the whole round. It exists to be a portfolio showpiece that demonstrates design engineering through a small, complete interaction, not through feature breadth. Success is someone finishing a round, turning over the prints they missed on the contact sheet, and noticing that it works just as well with a keyboard or a screen reader.

## Brand Personality

Tactile, precise, quietly playful. The voice is plain and warm with a light photographic accent: one photo word, "print", and everything else plain ("Writing ten questions…", "Correct.", "Not quite. The answer is Titus.", "Play History again"). Short and confident, never loud or gamified. The interface should feel like an archive reading room: warm paper, prints laid out, one oxblood grease pencil, and nothing that does not belong on it.

## Anti-references

- **Generic quiz-app SaaS** (Kahoot, Quizizz): primary-color cartoon energy, bubbly rounded everything, mascot cheer.
- **Gamified neon casino**: slot-machine glitz, coin showers, aggressive reward loops, streak-pressure dopamine. A photo studio is quiet, not a floor show.
- **Flat corporate dashboard**: Material or Bootstrap card grids, gray-on-white, zero atmosphere.
- **AI-generated slop**: gradient-text headers, glassmorphism everywhere, hero-metric templates, endless identical card grids.

## Design Principles

- **The print is the hero.** The photo carries the colour and the mood; the UI stays warm and quiet so every print sits on the same ground.
- **Progress is the artwork.** The filmstrip fills with marked prints as you play, and the end screen is the contact sheet. State and beauty are the same object.
- **One working accent.** Oxblood grease pencil marks wrong picks and missed frames, nothing else. Colour always means something.
- **Complete over broad.** A small flow executed impeccably beats a large one done adequately.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Keyboard-operable throughout: Tab between controls, A–D or 1–4 answer anywhere during a round (switchable off in Options), Enter goes to the next question, and focus rings are visible everywhere. Every print has a text description of what it shows. Respect `prefers-reduced-motion`: marks appear fully drawn. Red and green are never the only signal; every result also has a shape and a text tag. See DESIGN.md §8 for the full list of decisions.
