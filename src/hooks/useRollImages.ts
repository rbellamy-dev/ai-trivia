"use client";

import { useEffect, useState } from "react";
import type { Question } from "@/data/types";

export type PrintImage = {
  url: string;
  status: "loading" | "ready" | "failed";
};

// One request per print for the life of the page, so a remount (or React's
// dev double-effect) reuses the request already in flight.
const requests = new Map<string, Promise<PrintImage>>();

const load = (url: string) => {
  let req = requests.get(url);
  if (!req) {
    req = new Promise<PrintImage>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ url, status: "ready" });
      img.onerror = () => {
        requests.delete(url); // let a later round retry it
        resolve({ url, status: "failed" });
      };
      img.src = url;
    });
    requests.set(url, req);
  }
  return req;
};

/**
 * Starts every print in the roll developing as soon as the questions arrive,
 * and reports each one's status so the strip can show them developing.
 */
export function useRollImages(questions: Question[]): PrintImage[] {
  const [loaded, setLoaded] = useState<Record<string, PrintImage>>({});

  useEffect(() => {
    let live = true;
    for (const q of questions) {
      if (!q.photo) continue;
      load(q.photo.url).then((img) => {
        if (live) setLoaded((prev) => ({ ...prev, [img.url]: img }));
      });
    }
    return () => {
      live = false;
    };
  }, [questions]);

  return questions.map((q) => {
    // No photo found for this question: show the typographic print right away.
    if (!q.photo) return { url: "", status: "failed" };
    return loaded[q.photo.url] ?? { url: q.photo.url, status: "loading" };
  });
}
