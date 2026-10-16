---
name: Snapshot Trivia
description: A trivia game laid out on a photographer's light table. Each question arrives with a scene-setting photo print.
colors:
  table: "#f3efe7"
  table-glow: "#fbf8f2"
  table-edge: "#e9e3d7"
  ink: "#1f1b16"
  muted: "#655d52"
  line: "#d6cdbd"
  edge: "#8f8371"
  card: "#fffdf8"
  pencil: "#8c2f23"
  hit: "#2f6a3c"
  print: "#fffcf5"
  strip: "#e5ddcf"
  empty: "#d9cfbe"
  empty-text: "#5b5246"
  empty-2: "#e3dacb"
  focus: "#2d5bff"
typography:
  question:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.5rem (2rem from md)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "2.25-2.5rem (3-3.25rem from md)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  answer:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "0.8125-0.875rem"
    fontWeight: 400
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75-0.875rem"
    note: "question numbers, the score; tabular-nums"
  hand:
    fontFamily: "Permanent Marker, cursive"
    fontSize: "clamp(0.9375rem, 1.6vw, 1.25rem)"
rounded:
  answer: "8px"
  pill: "9999px"
components:
  print:
    backgroundColor: "{colors.print}"
    padding: "4% 4% 17%"
    rotate: "-1.2deg"
  answer:
    backgroundColor: "{colors.card}"
    border: "1px {colors.edge}"
    rounded: "{rounded.answer}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.pill}"
  button-quiet:
    backgroundColor: "{colors.card}"
    border: "1px {colors.edge}"
    rounded: "{rounded.pill}"
---

# Design System: Snapshot Trivia

## 1. Overview

**Creative North Star: "Reviewing prints on a light table"**

A photographer reviews a roll on a backlit light table: prints laid out, a strip of film along the edge, a grease pencil to mark keepers. Snapshot Trivia turns that ritual into a quiz. Every question arrives with a photo print from a library of 100 that sets the scene without giving the answer away.

The palette ("Museum") is warm and low-saturation on purpose: parchment, espresso ink and a single oxblood grease pencil, like prints in an archive. The photos bring the colour, and warm paper makes them read as printed photographs rather than screenshots. Oxblood is reserved for marks, so red always means "you marked this": a wrong pick, a missed frame.

**Key characteristics:**
- A soft backlit gradient on the body, falling off to the edges.
- The print is the hero: resting on the table with no tape or pins, slightly rotated, a warm paper border, a handwritten caption bottom-left and the frame number bottom-right.
- Progress is a filmstrip. Played frames show their print with a ✓ or ✗; frames ahead stay blank, so there is no peeking at what's coming.
- Marks are drawn, not toggled: a strike through a wrong pick, a full loop round the right answer, a check on the strip.
- The end screen is a contact sheet: the ten prints in a grid, each with its ✓ or ✗. Each print turns over (click, tap, or Enter/Space) to show its question, the answer, and your pick if you missed.

## 2. Colors

### Neutrals
- **Table** (#f3efe7), **Table glow** (#fbf8f2), **Table edge** (#e9e3d7): warm parchment with a soft backlit gradient.
- **Ink** (#1f1b16): espresso. Text, labels that matter (question number, correct count), primary buttons. 14.9:1 on the table.
- **Muted** (#655d52): secondary labels and copy. 5.7:1 on the table, 4.8:1 on the strip.
- **Line** (#d6cdbd): hairlines on settled, non-interactive surfaces (answered cards, popover).
- **Edge** (#8f8371): borders on things you can click (answer cards, quiet buttons). 3.2:1 on the table, 3.7:1 on cards.
- **Card** (#fffdf8): answer cards, the options popover, quiet buttons.
- **Print** (#fffcf5): photo paper.
- **Strip** (#e5ddcf), **Empty** (#d9cfbe), **Empty 2** (#e3dacb), **Empty text** (#5b5246): the filmstrip, undeveloped frames (hatched in the two empty tones), and their numbers (5.0:1).

### Signals
- **Pencil** (#8c2f23): oxblood grease pencil. Strikes, wrong-answer tags, missed frames, the brand dot. 7.2:1 on the table, so it works as text and as marks.
- **Hit** (#2f6a3c): correct, as text and the loop. 6.4:1 on cards.
- **Focus** (#2d5bff): focus rings, and nothing else.

### Named rules

**The Marked-Red Rule.** Oxblood means "marked": a wrong pick, a missed question, the "Leave" confirm. Question numbers, the correct count and captions are ink or muted, never red.

**The Neutral Table Rule.** The UI never adds a colour that competes with the photos. A new accent needs a reason stronger than decoration.

**Never Colour Alone.** Right and wrong are always shown by shape (loop / strike, ✓ / ✗) and by a text tag ("Correct", "Your pick", "Answer"), as well as colour.

## 3. Typography

One superfamily, IBM Plex:

- **IBM Plex Sans** carries everything you read: questions, answers, copy, buttons, labels. Sentence case throughout; no tracked uppercase.
- **IBM Plex Mono** is film-edge data only: question numbers, the best score and the number on the back of a print. Always `tabular-nums` where numbers change.
- **Permanent Marker** is handwriting: print captions (in ink) and the error title (in oxblood). It is decorative and hidden from screen readers wherever it repeats other text.

Sizes are fixed `rem` steps (questions 1.5rem → 2rem from `md`, headings 2.25–2.5rem → 3–3.25rem), so they follow the browser's text-size setting. Minimums: labels 0.8125rem (13px), answers 0.9375–1.0625rem. The back-of-print number is the only smaller text.

## 4. Elevation and surfaces

Shadows are tokens tinted with ink (never neutral grey), so they sit warm on the paper: `--shadow-print` (prints, error panel), `--shadow-card` (topic cards), `--shadow-thumb` (contact-sheet prints) and `--shadow-popover`. Prints sit on the table with the soft, low print shadow, as if lit from behind. Answers are warm card-white with a hairline border and no shadow, so the print stays the only object with depth. Rotation (-1.2deg on the print, small tilts on the topic picker) does more for physicality than shadow. On desktop the print is capped by viewport height, `min(380px, (100dvh − 16.5rem) / 1.45)`, so the filmstrip stays on screen on 768–800px-tall laptops.

## 5. Motion

| Name | What it does | Timing |
|---|---|---|
| `develop` | The print on the table fades in from blurred grayscale (one image at a time, so the filter is affordable) | 0.9s, ease-develop |
| `fade-in` | Contact-sheet prints arrive, staggered 50ms (opacity only, ten at once) | 0.5s |
| `draw` | A grease-pencil mark draws itself (SVG `pathLength=1`, dash offset 1→0) | strike 0.3s; loop 0.6s after 0.3s; strip check 0.35s after 0.9s |
| `bump` | The correct count ticks up | 0.35s |
| `pulse-soft` | Undeveloped frames breathe while their photo loads | 1.6s loop |
| `rise` | Entrances; transform-only so text paints at frame zero | 0.5s |
| Turn over | A contact-sheet print rotates 180° on Y to show its back | 0.5s, ease-out; instant with reduced motion |

**Reduced motion:** every animation and transition collapses to an instant change, and marks end fully drawn (fill mode `forwards`).

## 6. Rounds

- **Vocabulary:** one photo word is kept, *print* (a question's photo). Everything else is plain: topic, round, question, correct, answer.
- **Streaming:** questions stream in one at a time (NDJSON from `streamText` + `Output.array`), so question 1 plays in about 2 seconds while the rest are written. Frames not written yet show as hatched on the strip. Pressing Next before the next question exists shows "Writing the next question…" and continues by itself.
- **Loading:** "Writing your first History question…", "This usually takes a few seconds.", then "Still writing. Almost there." after 8s, with "Choose another topic" to cancel.
- **Question quality:** the prompt asks for medium questions, no famous first-fact questions, and same-kind distractors; the server drops any question that repeats, has duplicate choices, or puts its answer in the question text (`src/data/questionChecks.ts`). The model is asked for 12 so drops don't shorten the round; generation stops as soon as 10 good ones have been sent.
- **Leaving:** "Leave round" (or Escape) turns into "Leave this round? Leave / Keep playing" in the top bar.
- **Refresh:** the round in progress is saved to `sessionStorage` and resumed after a reload, without the topic picker flashing first; it's cleared when the round ends or is left. A round saved mid-stream continues with the questions it already has.
- **Topic cards:** each shows your best score on that topic ("Best 8/10") once you've played it, instead of a generic count.

## 7. Photos

- **A library, made once.** 100 prints (25 per topic) generated with Nano Banana 2 in one shared style: 35mm colour film, warm muted tones, gentle grain, no text, no people, no logos. They ship in `public/scenes/{topic}/` as WebP at 716×960 (trimmed 3% per side to lose the faint print border; about 74 KB each, so a round preloads about 0.7 MB), with 320px thumbnails in `thumbs/` (about 22 KB) for the filmstrip and contact sheet. Photos cost nothing at runtime and load instantly. `src/data/scenes.ts` lists each scene with a description of what it shows.
- **Choosing a photo.** The model picks one by name for each question, from its topic's list (shuffled per request, with descriptions, so it matches by subject rather than walking the list). The server then guarantees two things (`src/data/scenePicker.ts`): no photo repeats within a round, and no photo hints at the answer (a word of the answer, singular or plural, in the scene's name or description). Either way it swaps in another photo from the same topic.
- **The scene rule:** a photo sets the scene and never shows the answer. Captions read like archive labels ("Case 07", "Field notes") and never name a place, person or choice.
- **Topic covers:** four matching covers made the same way, in `src/assets/rolls/`, served through `next/image`.
- **No photo:** if an image fails to load, the print becomes a typographic card (caption, description, "No photo for this one") and the question still plays.

## 8. Accessibility decisions

| Decision | WCAG |
|---|---|
| Every print has a text description of what the photo shows (from the library, written when the image was made) | 1.1.1 |
| A–D / 1–4 and Enter work anywhere on the page during a round (not inside the Options panel), and can be switched off in Options | 2.1.4 |
| Results shown as text and shape, not colour alone | 1.4.1 |
| All text pairs ≥ 4.5:1; marks ≥ 3:1 | 1.4.3, 1.4.11 |
| Focus moves to each new question, to Next after answering, and to the verdict at the end | 2.4.3 |
| Results are announced in a polite live region | 4.1.3 |
| While the next question is still being written, the Next button stays focused (`aria-disabled`, relabelled "Writing the next question"), its text at full contrast, with three pulsing dots beside it carrying the motion | 2.4.3, 1.4.3 |
| "Leave round" (or Escape) asks first, inline; focus moves to "Keep playing", and Escape cancels | 3.3.4 (spirit), 2.4.3 |
| The loading screen offers "Choose another topic", which cancels the request | 2.2.1 (spirit) |
| The filmstrip is a list with a label per frame and `aria-current` on the current one | 1.3.1 |
| Contact-sheet prints are buttons (`aria-pressed`) that turn over on click, tap, or Enter/Space only, so what's shown always matches the pressed state; each is labelled with the question, the answer and, if missed, your pick | 1.1.1, 1.3.1, 2.1.1 |

## 9. Known gaps

- **Question freshness.** The prompt and the giveaway check stop most soft questions, but well-known facts (the Berlin Wall, Genghis Khan) still slip through; a "skip these" list per topic would help.
- **Photo fit.** With 25 photos per topic, some questions get a loose match (a platypus question on the frog photo). More scenes per topic, or a second variant of each, would tighten it.
