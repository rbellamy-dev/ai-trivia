---
name: Constellation Trivia
description: A serene night-sky trivia game where progress is drawn as a constellation.
colors:
  night: "#050810"
  deep: "#0a1020"
  starlight: "#e8eeff"
  fog: "#7c86a6"
  teal: "#6ee7d8"
  violet: "#a78bfa"
  stargold: "#ffd98e"
  correct: "#7be8a2"
  wrong: "#ff7b8a"
  aurora-1: "#1c4b45"
  aurora-2: "#2a1f5e"
  aurora-3: "#143a5c"
  star-silver: "#c8d4f5"
  star-bronze: "#d9a878"
typography:
  display:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "0.55em"
  headline:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "34px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0.02em"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "16px"
    fontWeight: 350
    lineHeight: 1.55
    letterSpacing: "normal"
  question:
    fontFamily: "Outfit, sans-serif"
    fontSize: "34px"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "normal"
  label:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "11px"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "0.3em"
rounded:
  tile: "12px"
  pill: "9999px"
spacing:
  tight: "12px"
  base: "16px"
  loose: "32px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.teal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 36px"
  button-quiet:
    textColor: "{colors.fog}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 36px"
  category-tile:
    backgroundColor: "{colors.starlight}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.tile}"
    padding: "24px 16px"
  answer-row:
    backgroundColor: "{colors.starlight}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.tile}"
    padding: "14px 22px"
  answer-correct:
    backgroundColor: "{colors.correct}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.tile}"
    padding: "14px 22px"
  answer-wrong:
    backgroundColor: "{colors.wrong}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.tile}"
    padding: "14px 22px"
---

# Design System: Constellation Trivia

## 1. Overview

**Creative North Star: "The Observatory"**

This is the quiet hour at an observatory: lights down, the dome open, a deep field of stars overhead, and a single instrument glowing softly in front of you. The interface is atmosphere first and controls second. A near-black canvas (#050810) holds a drifting aurora and a scatter of twinkling stars; the UI sits on top of it in restrained translucent glass, never a solid slab, never a bright card. The signature idea is that your score is not a readout but a drawing: each answered question lights a star in a constellation that assembles itself across the top of the play area, gold for a hit, faded for a miss.

The system rejects the visual language of the category on purpose. It is not a quiz-app playground (no Kahoot primary-color cartoons, no bubbly mascots), not a gamified casino (no coin showers, no streak-pressure dopamine), not a corporate dashboard (no gray-on-white Material card grids), and not AI slop (no gradient text anywhere, and glass is used sparingly as translucent surface over a live backdrop, never as decorative frost on an opaque page). Restraint is the point: one accent does the work, the wordmark carries its weight through wide tracking rather than a rainbow fill, and the sky does the rest.

**Key Characteristics:**
- Near-black cosmic canvas with a live aurora + starfield backdrop.
- Frameless, translucent-glass surfaces; no opaque cards.
- One working accent (teal); gold is earned, never decorative.
- Progress rendered as a self-drawing constellation.
- Unbounded display with extreme letter-spacing; airy light-weight Outfit body.
- Motion is meaningful and eased-out; every animation names an event.

## 2. Colors

A cool cosmic palette: one near-black canvas, one icy off-white for text, a single teal working accent, and a warm gold reserved for reward.

### Primary
- **Aurora Teal** (#6ee7d8): the one interactive color. Hover borders and glows, the current-question pulse, selected radio dot, focus rings, the loader's orbiting satellite. If something responds to you, it is teal.

### Secondary
- **Earned Gold** (#ffd98e): reserved for success. Correct-answer stars in the constellation, the finale medal core, the best-score value. Its scarcity is what makes a lit star feel like a win.
- **Nebula Violet** (#a78bfa): a supporting cosmic tone, used only for the silver-medal halo in the finale. Never an interactive color, never a text fill.

### Tertiary
- **Signal Green** (#7be8a2): correct-answer feedback state on answer rows only.
- **Signal Coral** (#ff7b8a): wrong-answer and error state only.

### Neutral
- **Void** (#050810): the page canvas. The night itself.
- **Deep Space** (#0a1020): a slightly lifted deep tone available for layering.
- **Starlight** (#e8eeff): primary text, and the tint source for every glass surface (used at 3%, 12%, 15%, 20%, 25% opacity for fills, borders, and dim dots).
- **Fog** (#7c86a6): secondary and label text, unanswered constellation lines. Lightened from a darker draft so 11px labels clear WCAG AA (>=4.5:1) on the Void canvas.

### Atmosphere (backdrop only)
- **Aurora blobs** (#1c4b45 teal-green, #2a1f5e indigo, #143a5c deep-blue): heavily blurred, low-opacity glows behind everything. Never touch the foreground.

### Named Rules
**The One Voice Rule.** Teal is the only interactive color. If a control lights up, hovers, focuses, or pulses, it is teal, never gold, violet, or green. Gold cannot be used to signal interactivity; it only marks something already won.

**The Earned Gold Rule.** Gold appears only as a consequence of a correct answer or a finished score. It is forbidden as decoration, as a border, or as a hover state.

## 3. Typography

**Display Font:** Unbounded (with sans-serif fallback)
**Body Font:** Outfit (with sans-serif fallback)

**Character:** Unbounded is a rounded geometric display face; set at light weight with very wide tracking it reads as a calm, futuristic marquee rather than a shout. Outfit is a clean, low-contrast humanist sans; at weight 350 the body text feels airy and unhurried, like the rest of the sky.

### Hierarchy
- **Display** (300, 1.25rem, tracking 0.55em, uppercase): the "Constellation" wordmark and finale titles. Extreme letter-spacing is the signature; the word is spread across the header like stars across a horizon.
- **Headline** (500, 34px, line-height 1.15): the category-select question ("Which sky will you chart?") and the finale tier name.
- **Question** (300, 34px, line-height 1.3; 24px under 720px): the live trivia question in Outfit, light and large, with a faint teal text-glow.
- **Body** (350, 16px, line-height 1.55): supporting copy and answer text. Cap prose at 65-75ch (the finale toast uses a 46ch measure).
- **Label** (300, 11px, tracking 0.3em, uppercase): the meta row ("Star 03 / 10"), category tile captions, verdict lines, best-score line. Small, wide, quiet.

### Named Rules
**The Wide-Tracking Rule.** Every uppercase Unbounded label carries at least 0.22em tracking, and the wordmark carries 0.55em. Tight uppercase is forbidden; the spacing is what makes it feel cosmic rather than corporate.

## 4. Elevation

Flat and atmospheric, not shadowed. There are no drop shadows on surfaces. Depth comes from three other moves: (1) translucency, foreground glass sits at 3-12% starlight over the live night backdrop, so the aurora reads faintly through it; (2) glow, teal and gold `drop-shadow` halos on active stars, the loader, and hover states signal energy, not height; (3) backdrop blur on glass tiles to separate them from the moving sky. A surface never lifts toward the viewer with a dark shadow; it either glows (active) or stays flat (at rest).

### Glow Vocabulary
- **Teal hover glow** (`box-shadow: 0 0 40px -8px var(--color-teal)` on tiles, `0 0 26px -6px` on answers): appears only on hover/focus of interactive surfaces.
- **Star glow** (`drop-shadow(0 0 6px …)`): on lit constellation nodes and the current-question pulse.
- **Score glow** (`text-shadow: 0 0 40px rgb(110 231 216 / 0.35)`): on the big finale score numeral only.

### Named Rules
**The No-Shadow Rule.** Surfaces cast no drop shadows. If something needs to feel active, it glows; if it needs separation, it uses translucency and blur. A 2014-style dark box-shadow under a card is forbidden.

## 5. Components

### Buttons
- **Shape:** full pill (9999px).
- **Primary:** teal text on a whisper-thin teal wash (border teal/50, bg teal/5), Unbounded label at 0.34em tracking, padding 16px 36px. Hover raises the wash (teal/15) and adds the teal glow.
- **Quiet:** transparent with a fog border and fog text; hover lifts text to starlight. Used for the secondary finale action.
- **Focus:** 2px teal focus-visible ring on both variants.

### Chips / Meta labels
- **Style:** no background; wide-tracked uppercase Unbounded. The question counter is teal, category and score are fog. The live score number pops (scale) on change.

### Cards / Containers
- **The system avoids cards.** There is no opaque panel. The old white 808px card is gone; the play area is a bare max-width column on the sky.
- Where a bounded surface is needed (category tiles, answer rows), it is glass: 12px radius, `bg-starlight/3`, `border-starlight/12`, `backdrop-blur-sm`. Never nested.

### Category Tiles
- **Corner:** 12px. **Background:** starlight/3 glass. **Icon:** monochrome teal line icon (24px) in a 46px disc. **Hover:** teal border, teal/5 fill, 3px lift, teal glow. Staggered `drift-in` entrance.

### Answer Rows (signature interaction)
- **Style:** full-width glass label rows, radio semantics preserved. The radio is restyled as a small key dot (starlight/25 at rest).
- **At rest / hover:** teal border + faint glow.
- **Locked correct:** green border + green/8 fill, dot glows green.
- **Locked wrong (your pick):** coral border + coral/8 fill, dot glows coral.
- **Locked other:** dimmed to 30% opacity.
- **Focus:** teal ring via `has-[:focus-visible]`.

### Inputs / Fields
- The only input is the answer radio, styled as above. No text fields in the app.

### The Constellation (signature component)
- An SVG progress meter (viewBox 800x64) spanning the top of the play area. Ten nodes, x evenly spaced, y randomized per game so every round draws a different sky. Correct = gold node + glow (r4.5); wrong = fog node (r3); current = pulsing teal (r4); future = starlight/20 (r3). Lines between adjacent answered nodes light gold. A visually hidden live-text "Question X of Y" carries the same state to screen readers.

### Loader
- An orbiting-planet spinner: a gold core with a dashed starlight/20 ring and a single teal satellite, `orbit-spin` 3s linear. Caption "Charting the sky…" in a wide-tracked label.

## 6. Do's and Don'ts

### Do:
- **Do** keep teal as the only interactive color and gold as reward-only (the One Voice and Earned Gold rules).
- **Do** render foreground surfaces as translucent glass over the live sky (`bg-starlight/3`, `backdrop-blur-sm`), so the aurora reads faintly through.
- **Do** convey depth with glow and translucency, never drop shadows (the No-Shadow rule).
- **Do** track uppercase Unbounded labels at 0.22em or wider (the Wide-Tracking rule).
- **Do** map every animation to a real event (a star igniting, the sky charting) and ease out; provide a `prefers-reduced-motion` settle for all ambient motion.
- **Do** keep progress available to screen readers via the constellation's live-text fallback; never rely on color alone.

### Don't:
- **Don't** reintroduce opaque cards or the old white panel; no card grids, and never nest a glass surface inside another.
- **Don't** drift toward generic quiz-app SaaS (Kahoot/Quizizz primary-color cartoon energy, bubbly rounded mascots).
- **Don't** turn it into a gamified neon casino (coin showers, slot glitz, streak-pressure reward loops).
- **Don't** let it flatten into a corporate dashboard (Material/Bootstrap gray-on-white card grids, zero atmosphere).
- **Don't** ship AI slop: no gradient text anywhere (the wordmark and finale title are solid color), no decorative glassmorphism on opaque pages, no hero-metric template, no identical card grids.
- **Don't** use `#000` or `#fff` for surfaces or text; the canvas is Void (#050810) and text is Starlight (#e8eeff).
- **Don't** put a colored `border-left` stripe on any row or callout; answer states use full borders + tint.
