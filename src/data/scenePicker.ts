import type { Scene } from "./scenes";
import { distinctiveWords, norm } from "./questionChecks";

/**
 * True when a scene's photo would hint at the answer: a word of the answer
 * (3+ letters, singular or plural) appears in the scene's name or description.
 * "Owl" as the answer and "owl at dusk" as the scene, for example. Short
 * words count here: owl, elk, bee and ant are exactly what scenes show.
 */
export const sceneHintsAnswer = (scene: Scene, answer: string) => {
  const text = ` ${norm(`${scene.name} ${scene.description}`)} `;
  const has = (w: string) => text.includes(` ${w} `);
  return distinctiveWords(answer, 3).some((w) => {
    const singular = w.endsWith("es") ? w.slice(0, -2) : w.endsWith("s") ? w.slice(0, -1) : w;
    return has(w) || has(singular) || has(`${singular}s`) || has(`${singular}es`);
  });
};

/**
 * The scene for one question. Uses the model's pick when it's unused this
 * round and doesn't hint at the answer; otherwise swaps in a random scene
 * from the same roll that passes both checks. `used` is the roll so far.
 */
export const pickScene = (
  wanted: string,
  answer: string,
  scenes: Scene[],
  used: Set<string>,
  random: () => number = Math.random
): Scene | null => {
  const fits = (s: Scene) => !used.has(s.name) && !sceneHintsAnswer(s, answer);
  const chosen = scenes.find((s) => s.name === wanted);
  if (chosen && fits(chosen)) return chosen;
  const pool = scenes.filter(fits);
  if (pool.length) return pool[Math.floor(random() * pool.length)];
  // Every scene is used or hints at it: any unused scene beats a repeat.
  return scenes.find((s) => !used.has(s.name)) ?? null;
};
