export type Category = {
  id: string;
  name: string;
  /** Sent to the question generator instead of `name`, when set. */
  topic?: string;
};

export const categories: Category[] = [
  { id: "science", name: "Science & Nature" },
  { id: "history", name: "History" },
  { id: "geography", name: "Geography" },
  { id: "biology", name: "Biology" },
];

/** What to ask the question generator for, given a roll's display name. */
export const topicFor = (name: string) =>
  categories.find((c) => c.name === name)?.topic ?? name;
