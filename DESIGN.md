---
name: Almanac
description: A serene trivia game played under a red aurora, where your score is drawn as a star chart.
colors:
  night: "#050810"
  deep: "#0a1020"
  starlight: "#e8eeff"
  fog: "#aab3cd"
  ember: "#ffb38a"
  violet: "#a78bfa"
  stargold: "#ffd98e"
  correct: "#7be8a2"
  wrong: "#ffa8cf"
  aurora-1: "#8c202a"
  aurora-2: "#2a1f5e"
  aurora-3: "#6e1830"
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
  question:
    fontFamily: "Outfit, sans-serif"
    fontSize: "34px"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "16px"
    fontWeight: 350
    lineHeight: 1.55
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
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ember}"
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

# Design System: Almanac

## 1. Overview

**Creative North Star: "The Red Observatory"**

This is the hour before dawn at a high-altitude observatory: the dome is open, a red aurora is burning low across the sky, and one instrument glows softly in front of you. The interface is atmosphere first and controls second. A near-black canvas holds a bank of deep red washes and a scatter of twinkling stars; the UI sits on top in restrained translucent glass, never a solid slab, never a bright card. The signature idea is that your score is not a readout but a drawing: each answered question lights a star in a chart that assembles itself across the top of the play area, gold for a hit, faded for a miss.

The red is doing real work. An earlier version of this system ran cool teal-green over the same black, which is the reflex palette for anything described as "cosmic" and made the interface read as generic sci-fi. Turning the sky red moved it somewhere specific: aurora australis, a blood moon, an old star atlas printed in rust. Because the backdrop is now warm, the single interactive accent had to move with it, from teal to a soft peach ember. Warm-on-warm reads as one world instead of two competing ones.

The system rejects the visual language of the category on purpose. It is not a quiz-app playground (no primary-color cartoons, no bubbly mascots), not a gamified casino (no coin showers, no streak-pressure dopamine), not a corporate dashboard (no gray-on-white card grids), and not AI slop (no gradient text anywhere, and glass is used sparingly as translucent surface over a live backdrop, never as decorative frost on an opaque page). Restraint is the point: one accent does the work, the wordmark carries its weight through wide tracking rather than a fill, and the sky does the rest.

**Key Characteristics:**
- Near-black canvas beneath a bank of deep red aurora washes.
- Frameless, translucent-glass surfaces; no opaque cards.
- One working accent (ember peach); gold is earned, never decorative.
- Progress rendered as a self-drawing star chart.
- Unbounded display with extreme letter-spacing; airy light-weight Outfit body.
- Motion is meaningful and eased-out; every animation names an event.

## 2. Colors

A warm cosmic palette: a near-black canvas lit by red aurora, one icy off-white for text, a single peach working accent, and a gold reserved strictly for reward.

### Primary
- **Ember Peach** (#ffb38a): the one interactive color. Hover borders and glows, the current-question pulse, the selected radio dot, focus rings, the loader's orbiting satellite. If something responds to you, it is ember. Clears 5.7:1 on glass over the deepest part of the aurora.

### Secondary
- **Earned Gold** (#ffd98e): reserved for success. Correct-answer stars in the star chart, the finale medal core, the best-score value. Its scarcity is what makes a lit star feel like a win.
- **Nebula Violet** (#a78bfa): a supporting cosmic tone, used only for the silver-medal halo in the finale. Never an interactive color, never a text fill.

### Tertiary
- **Signal Green** (#7be8a2): correct-answer feedback on answer rows only. Now complementary to the red backdrop, so a correct answer reads harder than it did on the old cool canvas.
- **Signal Rose** (#ffa8cf): wrong-answer and error state only. Held at hue 333 degrees, a deliberate 21 degrees off the backdrop, because the previous coral sat within one degree of the aurora and dissolved into it.

### Neutral
- **Void** (#050810): the page canvas. The night itself, visible at the edges where the aurora falls away.
- **Deep Space** (#0a1020): a slightly lifted deep tone available for layering.
- **Starlight** (#e8eeff): primary text, and the tint source for every glass surface (used at 3%, 12%, 15%, 20%, 25% opacity for fills, borders, and dim dots).
- **Fog** (#aab3cd): secondary and label text, unanswered chart lines. Lightened twice from the original draft; the current value is the first that clears WCAG AA on a glass surface sitting over the strongest aurora overlap, which is the tightest case in the app.

### Atmosphere (backdrop only)
- **Aurora Red** (#8c202a), **Aurora Wine** (#6e1830), **Aurora Indigo** (#2a1f5e): heavily blurred, low-opacity glows behind everything, plus the three radial washes that compose the canvas itself. Never touch the foreground.

### Named Rules

**The One Voice Rule.** Ember is the only interactive color. If a control lights up, hovers, focuses, or pulses, it is ember, never gold, violet, or green. Gold cannot be used to signal interactivity; it only marks something already won.

**The Earned Gold Rule.** Gold appears only as a consequence of a correct answer or a finished score. It is forbidden as decoration, as a border, or as a hover state.

**The Hue Distance Rule.** Because the backdrop is red, any color carrying meaning must sit at least 20 degrees of hue away from it. Measure before shipping a semantic color; a signal that shares the sky's hue is not a signal.

**The Single Source Rule.** The canvas washes are mixed from the aurora tokens with `color-mix`, never restated as literal `rgba()`. Backdrop and palette move together or they drift.

## 3. Typography

**Display Font:** Unbounded (with sans-serif fallback)
**Body Font:** Outfit (with sans-serif fallback)

**Character:** Unbounded is a rounded geometric display face; set at light weight with very wide tracking it reads as a calm, futuristic marquee rather than a shout. Outfit is a clean, low-contrast humanist sans; at weight 350 the body text feels airy and unhurried, like the rest of the sky.

### Hierarchy
- **Display** (300, 1.25rem, tracking 0.55em, uppercase): the "Almanac" wordmark and finale titles. Extreme letter-spacing is the signature; the word is spread across the header like stars across a horizon.
- **Headline** (500, 34px, line-height 1.15): the category-select question ("Which sky will you chart?") and the finale tier name.
- **Question** (300, 34px, line-height 1.3; 24px under 720px): the live trivia question in Outfit, light and large, with a faint ember text-glow.
- **Body** (350, 16px, line-height 1.55): supporting copy and answer text. Cap prose at 65-75ch (the finale toast uses a 46ch measure).
- **Label** (300, 11px, tracking 0.3em, uppercase): the meta row ("Star 03 / 10"), category tile captions, verdict lines, best-score line. Small, wide, quiet.

### Named Rules

**The Wide-Tracking Rule.** Every uppercase Unbounded label carries at least 0.22em tracking, and the wordmark carries 0.55em. Tight uppercase is forbidden; the spacing is what makes it feel cosmic rather than corporate.

**The Display-In-Controls Exception.** Product convention says keep display faces out of buttons and labels. This system overrides that on purpose: the wide-tracked Unbounded label *is* the brand, and it appears on buttons, meta rows, and captions. The override is deliberate and documented; do not "fix" it by swapping in a body font.

## 4. Elevation

Flat and atmospheric, not shadowed. There are no drop shadows on surfaces. Depth comes from three other moves: (1) translucency, foreground glass sits at 3-12% starlight over the live night backdrop, so the aurora reads faintly through it; (2) glow, ember and gold `drop-shadow` halos on active stars, the loader, and hover states signal energy, not height; (3) backdrop blur on glass tiles to separate them from the moving sky. A surface never lifts toward the viewer with a dark shadow; it either glows (active) or stays flat (at rest).

### Shadow Vocabulary
- **Ember hover glow** (`box-shadow: 0 0 40px -8px var(--color-ember)` on tiles, `0 0 26px -6px` on answers): appears only on hover/focus of interactive surfaces.
- **Star glow** (`drop-shadow(0 0 6px …)`): on lit chart nodes and the current-question pulse.
- **Score glow** (`text-shadow: 0 0 40px rgb(255 179 138 / 0.35)`): on the big finale score numeral only.

### Named Rules

**The No-Shadow Rule.** Surfaces cast no drop shadows. If something needs to feel active, it glows; if it needs separation, it uses translucency and blur. A 2014-style dark box-shadow under a card is forbidden.

**The Fixed-Layer Rule.** All atmosphere renders on one `position: fixed` layer (`.aurora-canvas`, applied to the NightSky element). `background-attachment: fixed` is forbidden; it repaints badly on iOS Safari over multi-stop radial gradients.

## 5. Components

### Buttons
- **Shape:** full pill (9999px).
- **Primary:** ember text on a whisper-thin ember wash (border ember/50, bg ember/5), Unbounded label at 0.34em tracking, padding 16px 36px. Hover raises the wash (ember/15) and adds the ember glow.
- **Quiet:** transparent with a fog border and fog text; hover lifts text to starlight. Used for the secondary finale action.
- **Focus:** 2px ember focus-visible ring on both variants.

### Chips / Meta labels
- **Style:** no background; wide-tracked uppercase Unbounded. The question counter is ember, category and score are fog. The live score number pops (scale) on change.

### Cards / Containers
- **The system avoids cards.** There is no opaque panel; the play area is a bare max-width column on the sky.
- Where a bounded surface is needed (category tiles, answer rows), it is glass: 12px radius, `bg-starlight/3`, `border-starlight/12`, `backdrop-blur-sm`. Never nested.

### Category Tiles
- **Corner:** 12px. **Background:** starlight/3 glass. **Icon:** monochrome ember line icon (24px) in a 46px disc. **Hover:** ember border, ember/5 fill, 3px lift, ember glow. Staggered `drift-in` entrance.

### Answer Rows (signature interaction)
- **Style:** full-width glass label rows wrapping a real radio input. All four radios share a `name`, so they form a native radio group: one tab stop, arrow keys move between options, Tab and Shift+Tab leave the group in the expected direction. Enter is layered on top of the native Space.
- **At rest / hover:** ember border + faint glow.
- **Locked correct:** green border + green/8 fill, dot glows green.
- **Locked wrong (your pick):** rose border + rose/8 fill, dot glows rose.
- **Locked other:** dimmed to 30% opacity.
- **Focus:** ember ring via `has-[:focus-visible]`.

### Inputs / Fields
- The only input is the answer radio, styled as above. No text fields in the app.

### The Star Chart (signature component)
- An SVG progress meter (viewBox 800x64) spanning the top of the play area. Ten nodes, x evenly spaced, y randomized per game so every round draws a different sky. Correct = gold node + glow (r4.5); wrong = fog node (r3); current = pulsing ember (r4); future = starlight/20 (r3). Lines between adjacent answered nodes light gold. A visually hidden live-text "Question X of Y" carries the same state to screen readers.

### Loader
- An orbiting-planet spinner: a gold core with a dashed starlight/20 ring and a single ember satellite, `orbit-spin` 3s linear. Caption "Charting the sky…" in a wide-tracked label. A spinner rather than a skeleton is deliberate: the wait is a real multi-second model call with unknowable shape, and the orbit is a brand moment rather than dead time.

## 6. Do's and Don'ts

### Do:
- **Do** keep ember as the only interactive color and gold as reward-only (the One Voice and Earned Gold rules).
- **Do** measure hue distance and contrast against the *deepest aurora overlap on a glass surface*, not against flat Void. That is the tightest case; anything that passes there passes everywhere.
- **Do** render foreground surfaces as translucent glass over the live sky (`bg-starlight/3`, `backdrop-blur-sm`), so the aurora reads faintly through.
- **Do** convey depth with glow and translucency, never drop shadows (the No-Shadow rule).
- **Do** track uppercase Unbounded labels at 0.22em or wider (the Wide-Tracking rule).
- **Do** mix backdrop colors from the aurora tokens with `color-mix` (the Single Source rule).
- **Do** map every animation to a real event (a star igniting, the sky charting) and ease out; provide a `prefers-reduced-motion` settle for all ambient motion.
- **Do** let native form semantics do the work: a shared radio `name` instead of hand-rolled Tab interception.
- **Do** keep progress available to screen readers via the chart's live-text fallback; never rely on color alone.

### Don't:
- **Don't** reintroduce opaque cards or a white panel; no card grids, and never nest a glass surface inside another.
- **Don't** drift toward generic quiz-app SaaS (Kahoot/Quizizz primary-color cartoon energy, bubbly rounded mascots).
- **Don't** turn it into a gamified neon casino (coin showers, slot glitz, streak-pressure reward loops).
- **Don't** let it flatten into a flat corporate dashboard (Material/Bootstrap gray-on-white card grids, zero atmosphere).
- **Don't** ship AI slop: no gradient text anywhere (the wordmark and finale title are solid color), no decorative glassmorphism on opaque pages, no hero-metric template, no identical card grids.
- **Don't** use a semantic color that shares the backdrop's hue. If it looks like part of the sky, it has stopped being a signal.
- **Don't** use `#000` or `#fff` for surfaces or text; the canvas is Void (#050810) and text is Starlight (#e8eeff).
- **Don't** put a colored `border-left` stripe on any row or callout; answer states use full borders + tint.
- **Don't** use `background-attachment: fixed`; atmosphere belongs on the one fixed NightSky layer.
- **Don't** hand-roll keyboard navigation for standard controls. If you are intercepting Tab, you have skipped a native affordance.
