import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SCENES } from "./scenes";

describe("print library", () => {
  it("has 25 unique scenes per roll", () => {
    for (const scenes of Object.values(SCENES)) {
      expect(scenes).toHaveLength(25);
      expect(new Set(scenes.map((s) => s.name)).size).toBe(25);
    }
  });

  it("has a print and a thumbnail on disk for every scene", () => {
    for (const s of Object.values(SCENES).flat()) {
      expect(existsSync(join(process.cwd(), "public", s.src)), s.src).toBe(true);
      expect(existsSync(join(process.cwd(), "public", s.thumb)), s.thumb).toBe(true);
    }
  });
});
