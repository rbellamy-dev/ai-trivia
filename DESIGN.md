---
name: Card Table
description: A trivia game played as a hand of cards on green felt, where the question is the top card of a stack and your answers are the hand you hold.
colors:
  felt: "#145a3a"
  felt-2: "#0d432b"
  card: "#fff8ea"
  ink: "#171310"
  sun: "#ffd23f"
  sun-edge: "#b8901a"
  coral: "#ff5c39"
  coral-ink: "#c93a18"
  mint: "#1ee0a0"
  mint-ink: "#0a7a52"
  back-1: "#1e6b48"
  back-2: "#17593b"
  back-edge: "#0b3924"
  blank: "#c8c0ac"
typography:
  display:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.3em"
  headline:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.06em"
  question:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "clamp(20px, 3vw, 28px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.01em"
  body:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  card:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  label:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
  button:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  mini: "2px"
  pile: "8px"
  card: "12px"
  stack: "14px"
  pill: "9999px"
spacing:
  tight: "12px"
  base: "16px"
  loose: "32px"
components:
  button-primary:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  button-quiet:
    textColor: "{colors.card}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  question-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.question}"
    rounded: "{rounded.stack}"
    padding: "18px 22px"
  hand-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.card}"
    rounded: "{rounded.card}"
    padding: "12px 12px 14px"
  hand-card-hit:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px 12px 14px"
  hand-card-miss:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px 12px 14px"
  deck-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  score-chip:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0"
---

# Design System: Card Table

## 1. Overview

**Creative North Star: "The Kitchen-Table Card Game"**

A green felt table, a deck of cream cards with black ink, a single yellow poker chip. The interface is a physical game, not a form: the question is the top card of a slightly askew stack in the middle of the table, your four answers are a hand of cards fanned at the bottom edge, and the two piles either side (draw on the left, played on the right) are the progress bar. Nothing is a widget. Everything you can touch is a card, and cards behave like cards: they are dealt in from the draw pile, they lift when you reach for them, the one you choose plays upward and takes its colour (mint for a hit, coral for a miss), and the question card gets a rubber stamp.

The palette is deliberately small and deliberately loud. Felt green and cream carry almost everything; ink draws every edge at 1.5-2px so the cards read as printed objects rather than soft UI panels; yellow is the chip and the one button. Coral and mint are reserved for outcomes. Anton, a heavy condensed grotesque, sets the question in uppercase like the face of a playing card, and Atkinson Hyperlegible (a typeface designed for low-vision readers) carries every answer and label so the game stays readable at 15px bold on a small card.

The system rejects the visual language of the category on purpose. It is not a quiz-app playground (no primary-color cartoons, no mascots, no confetti), not a gamified casino (no slot glitz, no coin showers; a card table is a quiet room, not a floor show), not a corporate dashboard (no gray-on-white grids), and not AI slop (no gradient text, no glassmorphism, no hero-metric template). The one indulgence is the flat 2D "drop edge" shadow under every card and button, which is what makes the objects feel like they sit on the table.

**Key Characteristics:**
- Radial felt gradient with a faint diagonal weave and an edge vignette, on one fixed layer.
- Every surface is a card: cream, ink-edged, a hard drop edge, slightly rotated.
- Progress is spatial: the draw pile empties, the played pile fills with mini-cards.
- The score is a poker chip; the finale names your hand (Royal Flush, Full House, Straight, Two Pair, High Card).
- Anton for anything that shouts (question, corners, stamps, buttons); Atkinson Hyperlegible for anything you read.
- Motion is physical and short: deal, lift, play, stamp. Nothing loops except the shuffle loader.

## 2. Colors

Three neutrals do the work (felt, card, ink), one warm accent (sun) marks value and action, and two signal colours (coral, mint) mark outcomes.

### Primary
- **Sun** (#ffd23f): the poker chip, the primary button, the verdict line, the wordmark, the big finale score. It is the only interactive colour on the felt and the only "money" colour. Ink on sun clears 13:1.

### Secondary
- **Card** (#fff8ea): every card face, and the default text colour on felt (8.4:1 against felt, 10:1 against felt-2). Used at 70-80% for secondary copy on felt.
- **Ink** (#171310): all card text, all card borders, all drop edges. Never used as a large fill except the drop edge under the primary button.

### Tertiary
- **Mint** (#1ee0a0): a hit. The played card's fill, the played-pile mini, the reveal ring around the right card after a miss. Ink text on mint clears 10:1.
- **Coral** (#ff5c39): a miss. The played card's fill and the played-pile mini. Ink text on coral clears 6:1.
- **Mint Ink** (#0a7a52) and **Coral Ink** (#c93a18): the same two signals darkened for use as *text and borders on cream* (the HIT / MISS stamp, corner letters, red suits, the "Misdeal" title). Coral at full brightness fails as text on cream (2.9:1); coral-ink clears 4.84:1 and mint-ink 5.07:1, so both pass AA as text at any size.

### Neutral
- **Felt** (#145a3a) and **Felt 2** (#0d432b): the table, as a radial gradient centred slightly above the middle. `body` is felt-2 so any overscroll matches the edge of the table.
- **Back 1 / Back 2 / Back Edge** (#1e6b48 / #17593b / #0b3924): the diagonal stripes and border of a face-down card (draw pile, shuffle loader).
- **Blank** (#c8c0ac): an unplayed mini-card, at 50% opacity.
- **Sun Edge** (#b8901a): the chip's drop edge.

### Named Rules

**The Outcome Rule.** Mint and coral mean hit and miss, nothing else. They are never decorative, never hover states, never used to draw attention to something that has not been answered.

**The Two-Ink Rule.** A signal colour is a *fill* at full brightness (mint, coral) and a *text or border* at its ink variant (mint-ink, coral-ink). Never set text in #1ee0a0 or #ff5c39 on cream.

**The One Chip Rule.** Sun is the only interactive colour on the felt and the only fill on the primary button. If something else needs a button it is the quiet variant (cream outline), never a second colour.

**The Single Source Rule.** The felt weave and vignette are mixed from the tokens with `color-mix`, never restated as literal `rgba()`. The backdrop and the palette move together or they drift.

## 3. Typography

**Display Font:** Anton (with Impact / sans-serif fallback)
**Body Font:** Atkinson Hyperlegible (with sans-serif fallback)

**Character:** Anton is a tall, heavy, condensed grotesque; set in uppercase it reads like the face of a playing card or a poster from a card room. Atkinson Hyperlegible was designed by the Braille Institute for maximum character distinction; at 15px bold it stays legible on a small rotated card and at 11px bold it makes a good tracked label.

Anton has no suit glyphs, so the suits (♣ ♦ ♥ ♠) fall through to the system font by design. They are sized independently (22-26px in corners, 64px on the deck faces) so they hold their own next to the Anton corner numbers.

### Hierarchy
- **Display** (Anton, 18px, tracking 0.3em, uppercase): the "Card Table" wordmark, shown on the non-play screens.
- **Headline** (Anton, 34px, tracking 0.06em, uppercase; 28px on phones): "Pick a deck", the finale hand name.
- **Question** (Anton, clamp(20px, 3vw, 28px), line-height 1.1, uppercase): the live question, on the card.
- **Corner** (Anton, 22px, tracking 0.03em): the question card's index ("05") top-left, beside the suit.
- **Stamp** (Anton, 36px, tracking 0.06em, 4px border): HIT / MISS.
- **Card** (Atkinson, 15px, 700, line-height 1.2): the answer text on hand cards.
- **Body** (Atkinson, 16px, 400, line-height 1.5): supporting copy. Cap prose at 42ch.
- **Label** (Atkinson, 10-12px, 700, tracking 0.1-0.14em, uppercase): the top bar, pile captions, category label, best-hand line.
- **Button** (Anton, 14px, tracking 0.08em, uppercase): all buttons.

### Named Rules

**The Shout / Read Rule.** Anton for anything that is shouted across the table (the question, numbers, stamps, buttons, headings). Atkinson for anything that is read (answers, copy, labels). Never set an answer in Anton; never set a button in Atkinson.

**The Uppercase Rule.** Anton is always uppercase. Lowercase Anton is forbidden.

## 4. Elevation

Cards on a table, so depth is a hard 2D drop edge, not a soft blur. Every card and button carries `box-shadow: 0 Npx 0 <edge>` with zero blur: 6px under the question stack, 4px under hand and deck cards, 3px under the chip (sun-edge) and the primary button (ink), 2px under piles. The edge sits straight down, as though the light is overhead. Rotation (the stack at -1deg, the fan at -9/-3/3/9deg, the decks at -14/-5/5/14deg) does more for physicality than any shadow.

There is no blur, no translucency, no backdrop filter anywhere. The felt shows through nothing; cards are opaque.

### Shadow Vocabulary
- **Stack edge** `0 6px 0 rgb(0 0 0 / 0.35)`: question card and the two cards under it.
- **Card edge** `0 4px 0 rgb(0 0 0 / 0.35)`: hand cards, deck cards, the error card.
- **Chip edge** `0 3px 0 var(--color-sun-edge)`: the score chip.
- **Button edge** `0 3px 0 var(--color-ink)`: the primary button; drops to `0 1px` on press and rises to `0 4px` on hover.
- **Pile edge** `0 2px 0 rgb(0 0 0 / 0.4)`: draw and played piles.
- **Reveal ring** `ring-4 ring-mint`: the right card after a miss.

### Named Rules

**The Hard-Edge Rule.** Shadows have zero blur. A soft, blurred drop shadow under a card is forbidden; it turns the table into a SaaS dashboard.

**The Fixed-Layer Rule.** The felt renders on one `position: fixed` layer (`.felt-canvas`, applied to the FeltTable element). `background-attachment: fixed` is forbidden.

## 5. Components

### Buttons
- **Shape:** full pill, 2px ink border, Anton 14px uppercase, padding 10px 22px.
- **Primary:** sun fill, ink text, 3px ink drop edge. Hover lifts 1px and deepens the edge; active presses 2px and flattens it. Focus: 3px cream outline, offset 2px.
- **Quiet:** transparent, cream/70 border, cream text. Hover: full cream border, cream/10 fill. Focus: 3px sun outline.
- Copy is card-table vocabulary: "Deal next", "Show my hand", "Deal {deck} again", "Pick another deck", "Fold", "Misdeal".

### Score Chip
- A sun disc with a 3px dashed ink ring and a sun-edge drop, Anton numeral. 44px in the top bar, 88px on the finale. `role="img"` with a "Score: N" label; pops (scale 1.3 → 1) whenever the value changes.

### Top Bar
- "{Deck} · Hand n of 10" in a 12px bold tracked label, cream, left; the chip right. Shown only during play (the wordmark header takes its place on other screens).

### Question Stack (signature component)
- Max 440px wide, min 270px tall (220px on phones). Two cards behind (rotated -5deg / +3deg, at 70% / 85% opacity) and the top card at -1deg. The top card is `position: relative` and in flow; it grows with a long question, and the two backs are `inset: 0` so they follow.
- Top card: corner index ("05") and suit glyph on the first row, the question in Anton uppercase centred vertically, the category label on the last row. The HIT / MISS stamp lands in the empty strip at top centre.
- **Stamp:** absolute top-right, rotated 12deg, 4px border, Anton 36px. HIT in mint-ink, MISS in coral-ink. Enters with the `stamp` keyframe (scale 1.6 → 1) so it lands like a rubber stamp. Overlapping the question is intended.
- Re-keyed per question so it re-deals (`deal` keyframe: from up-left, the direction of the draw pile).

### Piles
- **Draw pile** (left): up to three striped card backs stacked with 2px offsets; the count shrinks with the questions remaining, and an empty dashed outline is shown at zero. Caption "draw" (the count lives in the top bar). `role="img"` labelled with the remaining count.
- **Played pile** (right): a cream card whose face fills with 16×22px mini-cards, mint for a hit, coral for a miss, in play order. Caption "played". `role="img"` labelled "{hits} hits, {misses} misses".
- On phones (≤640px) the piles are replaced by a **progress strip**: ten 16×22px mini-cards in one row under the question (mint hit, coral miss, blank to come, the current hand outlined in sun).

### Hand Cards (signature interaction)
- Four `<button>`s, 150×150px minimum, cream, 2px ink border, 12px radius, 4px drop edge, overlapping by 28px (`-mx-3.5`), transform origin 50% 120%. Fanned at -9/-3/3/9deg with the outer two dropped 10px. Each shows a coral-ink Anton letter (A-D) top-left, the answer in Atkinson 15px bold, and the deck's suit bottom-right (tinted red for ♦ ♥).
- **Hover:** straightens and lifts 16px.
- **Played, hit:** straightens, lifts 26px, fills mint.
- **Played, miss:** straightens, lifts 26px, fills coral. The right card is ringed in 4px mint; the other cards fade to 80%.
- **Entrance:** `lift` keyframe (from below), staggered 70ms per card.
- **Focus:** 3px sun outline, offset 2px (the ring sits on the felt, outside the card).
- **Phones (≤640px):** a 2×2 grid, no rotation, no lift, 92px minimum height.
- After a pick the buttons stay focusable (`aria-disabled`, not `disabled`) and each carries a visually hidden outcome ("Your card, a hit" / "The right card" / "Your card, a miss").

### Verdict Line
- Anton 14px uppercase, sun, centred above the hand, `aria-live="polite"`. "Hit. Take the trick." / "Miss. The ringed card was the play." / "Play a card first." The hand sits 40px below it so a lifted card never covers it.

### Deck Cards (category select)
- Four face-up cards, 150px wide at a 5:7 ratio, one suit each: ♣ Science & Nature, ♦ History, ♥ Geography, ♠ Pop Culture. Small suit top-left, 64px suit centred, the name in Anton 13px and "10 hands" in a label at the bottom. Fanned at -14/-5/5/14deg, transform origin 50% 130%; hover straightens and lifts 16px. 2×2 grid on phones.

### Finale
- Large chip (the only place the score is shown as a number), the hand name as the heading in Anton 44px sun (Royal Flush 100%, Full House ≥80%, Straight ≥60%, Two Pair ≥40%, High Card below), "{n} of 10 tricks", one line of table talk, a row of ten mini-cards in play order (each with a hidden "Hand n: hit/miss"), the best hand from `useScoreHistory` (date shown as "Sep 28"), and "Deal {deck} again" (primary) / "Pick another deck" (quiet).

### Loader
- Three card backs cycling through the `shuffle` keyframe at staggered offsets, captioned "Shuffling the deck…" in Anton sun. `role="status"`. The only looping animation in the system; it settles to a still stack under reduced motion.

### Error
- A cream card with "Misdeal" in coral-ink Anton, the message (`role="alert"`) and a "Deal again" primary button that returns to deck selection.

## 6. Do's and Don'ts

### Do:
- **Do** treat every surface as a card: cream, ink-edged, hard drop edge, a little rotation.
- **Do** keep mint and coral for outcomes only (the Outcome rule) and use their ink variants for text on cream (the Two-Ink rule).
- **Do** keep sun as the only interactive colour on felt (the One Chip rule).
- **Do** set shouted text in uppercase Anton and read text in Atkinson (the Shout / Read rule).
- **Do** give every card animation a physical meaning (deal, lift, play, stamp) and keep it under half a second.
- **Do** collapse fans to grids at ≤640px; a rotated fan of 150px cards does not fit a phone.
- **Do** keep the piles and the outcome available to screen readers (`role="img"` labels, hidden outcome text, `aria-live` verdict); never rely on colour alone.
- **Do** measure text contrast on cream for anything red or green; the bright fills fail as type.

### Don't:
- **Don't** blur a shadow, add a backdrop filter, or make a card translucent. This is a table, not glass.
- **Don't** set answers or body copy in Anton, or buttons in Atkinson.
- **Don't** use mint or coral as hover, focus, or decoration.
- **Don't** put text in #1ee0a0 or #ff5c39 on cream.
- **Don't** drift toward the quiz-app playground (cartoon primaries, mascots, confetti) or the neon casino (slot glitz, coin showers, streak pressure). A card table is a quiet room.
- **Don't** ship AI slop: no gradient text, no glassmorphism, no hero-metric template, no identical card grids on white.
- **Don't** use `#000` or `#fff`; the darkest colour is ink (#171310) and the lightest is card (#fff8ea).
- **Don't** use `background-attachment: fixed`; the felt belongs on the one fixed FeltTable layer.
- **Don't** hand-roll keyboard navigation. Answer cards are real buttons, each its own tab stop.

### Round controls (added after critique, 2026-09-28)
- **Deal next** stays invisible (space reserved, not focusable) until a card is played, so it cannot be pressed by mistake.
- **Fold**: a quiet text button in the top bar (44px tall) that returns to deck selection mid-round.
- **Keyboard**: A–D or 1–4 plays a card; Enter deals the next hand (skipped when a live button has focus, so it never deals twice). A hint line shows on desktop.
- **Error card**: player-facing copy only (server messages are for developers), with "Deal again" (retries the same deck) and "Pick another deck" in an ink outline variant.
- **Loader**: after 5 seconds adds "Fresh questions take a few seconds to write."
- **Phones held sideways** (height ≤500px, `short:` variant): piles and strip hide (the top bar carries "Hand n of 10"), the four answers sit in one row without suits, and Deal next moves up beside the verdict line so the whole hand fits on screen down to 568×320.

### Joker deck (added 2026-09-28)
- A fifth deck card after the four suits: **ink face, sun border, sun ★**, labelled "Joker / Mixed deck". It is the wild card: its questions mix all four topics.
- The screen says "Joker"; the question generator receives the deck's `topic` string from `data/categories.ts` (via `topicFor`), so the API route and game hook are unchanged.
- Fan becomes five cards (-16/-8/0/8/16deg), widths `clamp(112px, 17vw, 150px)` so the fan fits from 640px up. On phones the Joker spans both grid columns as a horizontal card.
- During play the Joker's suit glyph is ★ (ink on cream).
