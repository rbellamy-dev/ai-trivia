export type CategoryIconName = "flask" | "column" | "globe" | "note" | "joker";

export type Category = {
  id: string;
  name: string;
  icon: CategoryIconName;
  /** Sent to the question generator instead of `name`, when set. */
  topic?: string;
};

export const categories: Category[] = [
  { id: "science", name: "Science & Nature", icon: "flask" },
  { id: "history", name: "History", icon: "column" },
  { id: "geography", name: "Geography", icon: "globe" },
  { id: "pop-culture", name: "Pop Culture", icon: "note" },
  {
    id: "joker",
    name: "Joker",
    icon: "joker",
    topic:
      "Mixed general knowledge: spread the ten questions across science & nature, history, geography and pop culture",
  },
];

/** What to ask the question generator for, given a deck's display name. */
export const topicFor = (name: string) =>
  categories.find((c) => c.name === name)?.topic ?? name;
