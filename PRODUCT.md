# Product

## Register

product

## Users

Two audiences at once. The primary audience is people evaluating the maker's craft: recruiters, hiring managers, and peers who open the app for two minutes and judge taste, polish, and attention to detail. The secondary audience is casual players on any device who just want a quick, good-looking trivia round. Both meet the same surface, so it has to read as a finished, considered product on first glance and still be genuinely fun to play through ten questions.

## Product Purpose

A single-screen trivia game: pick a deck, answer ten AI-generated questions one hand at a time, watch the draw pile empty and the played pile fill as you go, and land on a scored finale that names your hand. It exists to be a portfolio showpiece that demonstrates design and front-end craft through a small, complete, delightful interaction, not through feature breadth. Success is someone finishing a round, feeling the table, and remembering the answers-as-a-hand-of-cards idea.

## Brand Personality

Tactile, sharp, good-humoured. The voice is card-table talk ("Hit. Take the trick.", "Shuffling the deck…", "Misdeal"), confident and short, never loud or gamified. The interface should feel like a well-kept card room: green felt, a clean deck, one chip on the table, and nothing that does not belong on it.

## Anti-references

- **Generic quiz-app SaaS** (Kahoot, Quizizz): primary-color cartoon energy, bubbly rounded everything, mascot cheer.
- **Gamified neon casino**: slot-machine glitz, coin showers, aggressive reward loops, streak-pressure dopamine. A card table is a quiet room, not a floor show.
- **Flat corporate dashboard**: Material or Bootstrap card grids, gray-on-white, zero atmosphere.
- **AI-generated slop**: gradient-text headers, glassmorphism everywhere, hero-metric templates, endless identical card grids.

## Design Principles

- **Progress is the artwork.** The score is not a number in a corner; it is the draw pile shrinking and the played pile filling. State and beauty are the same object.
- **One working accent.** Yellow is the chip and the one button. Mint and coral are outcomes. Color means something; it is never decoration.
- **Everything is a card.** If you can touch it, it is a card, and it behaves like one: dealt in, lifted on hover, played upward when chosen.
- **Quiet motion with intent.** Every animation maps to a physical act (deal, lift, play, stamp) and is over in half a second. No motion for motion's sake, no bounce.
- **Complete over broad.** A small flow executed impeccably beats a large one done adequately. Every phase gets finished-product care.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Keyboard-operable throughout (Tab between cards, Enter or Space to play one, visible yellow focus outlines on every control). Respect `prefers-reduced-motion` (deal, lift, stamp and shuffle settle to static). The body face is Atkinson Hyperlegible, chosen for character distinction at small sizes. Watch contrast of red and green *as text* on cream: the bright fills are for cards, the darker ink variants are for type. Progress conveyed by the piles must also be available to screen readers via labelled images and a live verdict line, never by color or shape alone.
