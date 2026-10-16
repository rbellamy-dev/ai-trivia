import { describe, expect, it } from "vitest";
import { photoQueriesFor } from "./photoQueries";

describe("photo searches per roll", () => {
  it("gives each roll its own list", () => {
    expect(photoQueriesFor("History")).toContain("ancient ruins");
    expect(photoQueriesFor("History")).not.toContain("coral reef");
  });

  it("gives Biology its own list", () => {
    const biology = photoQueriesFor("Biology");
    expect(biology).toContain("petri dish culture");
    expect(biology).not.toContain("ancient ruins");
    expect(new Set(biology).size).toBe(biology.length);
  });

  it("falls back to every search for an unknown roll", () => {
    const all = photoQueriesFor("Something else");
    expect(all).toContain("coral reef");
    expect(all).toContain("petri dish culture");
  });
});
