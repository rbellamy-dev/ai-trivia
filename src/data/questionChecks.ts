// Server-side checks on each AI-written question. The prompt asks for all of
// this, but only these checks guarantee it; a question that fails is dropped.

const STOP = new Set(["the", "a", "an", "of", "and", "in", "on", "to", "for", "is", "was"]);

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * True when the question text gives its own answer away: the whole answer
 * appears in it, or every distinctive word of the answer does
 * ("Which ocean is the Pacific Ocean?").
 */
export const leaksAnswer = (question: string, answer: string) => {
  const q = ` ${norm(question)} `;
  const a = norm(answer);
  if (!a) return false;
  if (q.includes(` ${a} `)) return true;
  const words = a.split(" ").filter((w) => w.length >= 4 && !STOP.has(w));
  return words.length > 0 && words.every((w) => q.includes(` ${w} `));
};

/** Distinctive words (at least `min` letters, not stop words), normalised. */
export const distinctiveWords = (text: string, min = 4) =>
  norm(text)
    .split(" ")
    .filter((w) => w.length >= min && !STOP.has(w));

/** Four distinct choices, the answer among them, and no giveaway in the question. */
export const isPlayable = (q: { question: string; choices: string[]; answer: string[] }) => {
  const answer = q.answer[0] ?? "";
  const distinct = new Set(q.choices.map(norm)).size === q.choices.length;
  return distinct && q.choices.includes(answer) && !leaksAnswer(q.question, answer);
};
