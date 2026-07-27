export type CategoryIconName = "flask" | "column" | "globe" | "note";

export type Category = {
  id: string;
  name: string;
  icon: CategoryIconName;
};

export const categories: Category[] = [
  { id: "science", name: "Science & Nature", icon: "flask" },
  { id: "history", name: "History", icon: "column" },
  { id: "geography", name: "Geography", icon: "globe" },
  { id: "pop-culture", name: "Pop Culture", icon: "note" },
];
