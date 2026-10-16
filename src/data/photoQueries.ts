import { categories } from "./categories";
import { SCENES, type Scene } from "./scenes";

const ALL: Scene[] = Object.values(SCENES).flat();

/**
 * The scenes a roll may use. `category` is what the client sends: a roll's
 * name (or its topic text, if it has one). Unknown categories get every scene.
 */
export const scenesFor = (category: string): Scene[] => {
  const roll = categories.find((c) => c.name === category || c.topic === category);
  return (roll && SCENES[roll.id]) || ALL;
};

/** Just the scene names, for the question schema's enum. */
export const photoQueriesFor = (category: string): [string, ...string[]] =>
  scenesFor(category).map((s) => s.name) as [string, ...string[]];
