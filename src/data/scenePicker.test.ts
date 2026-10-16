import { describe, expect, it } from "vitest";
import { pickScene, sceneHintsAnswer } from "./scenePicker";
import type { Scene } from "./scenes";

const scene = (name: string, description = ""): Scene => ({
  name,
  description,
  src: `/scenes/x/${name}.webp`,
  thumb: `/scenes/x/thumbs/${name}.webp`,
});
const owl = scene("owl at dusk", "An owl perched on a branch at dusk");
const hills = scene("rolling hills", "Rolling green hills patterned with hedgerows");
const pond = scene("pond water", "A still pond edge with reeds and lily pads");
const scenes = [owl, hills, pond];

describe("sceneHintsAnswer", () => {
  it("flags a scene that shows the answer", () => {
    expect(sceneHintsAnswer(owl, "Owl")).toBe(true);
    expect(sceneHintsAnswer(owl, "Owls")).toBe(true); // plural answer, singular scene
    expect(sceneHintsAnswer(pond, "Lily")).toBe(true); // matches 'lily' in the description
  });

  it("ignores short or unrelated answers", () => {
    expect(sceneHintsAnswer(hills, "Titus")).toBe(false);
    expect(sceneHintsAnswer(hills, "The Elk")).toBe(false);
  });
});

describe("pickScene", () => {
  it("uses the model's pick when it fits", () => {
    expect(pickScene("rolling hills", "Titus", scenes, new Set())).toBe(hills);
  });

  it("swaps a scene that hints at the answer", () => {
    const picked = pickScene("owl at dusk", "Owl", scenes, new Set(), () => 0);
    expect(picked).not.toBe(owl);
  });

  it("never repeats a scene within a round", () => {
    const picked = pickScene("rolling hills", "Titus", scenes, new Set(["rolling hills"]), () => 0);
    expect(picked).not.toBe(hills);
    expect(picked).toBeTruthy();
  });

  it("falls back to any unused scene when nothing passes both checks", () => {
    const picked = pickScene("owl at dusk", "Owl", [owl, hills], new Set(["rolling hills"]));
    expect(picked).toBe(owl);
  });
});
