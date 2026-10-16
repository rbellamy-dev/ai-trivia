/** A print from the library in public/scenes (see data/scenes.ts). */
export type Photo = {
  url: string;
  /** A small version for the filmstrip and contact sheet. */
  thumb: string;
  /** What the photo shows. */
  alt: string;
};

export type Question = {
  id: string;
  question: string;
  choices: string[];
  answer: string[];
  /** Handwritten caption on the print. Never names the answer. */
  caption: string;
  /** Text alternative for the print. Never names the answer. */
  imageAlt: string;
  /** The scene-setting print, or null when no photo was found. */
  photo: Photo | null;
};
