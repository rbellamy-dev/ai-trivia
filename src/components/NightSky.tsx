"use client";

import { useEffect, useState } from "react";

type Star = {
  size: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
};

const genStars = (count: number): Star[] =>
  Array.from({ length: count }, () => ({
    size: Math.random() * 2 + 0.6,
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    duration: `${Math.random() * 4 + 1.5}s`,
    delay: `${Math.random() * 4}s`,
  }));

/**
 * Full-viewport night sky: aurora blobs, a twinkling starfield, and a
 * periodic shooting star. Purely decorative (aria-hidden).
 *
 * The starfield is generated in useEffect (not during render) so the server
 * and first client paint both emit an empty field — avoids hydration mismatch
 * from Math.random().
 */
const NightSky = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(genStars(110));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-night"
    >
      {/* aurora glow */}
      <span className="absolute -top-[12vh] -left-[10vw] h-[42vh] w-[60vw] rounded-full bg-aurora-1 opacity-30 blur-[90px] animate-aurora" />
      <span
        className="absolute -bottom-[14vh] -right-[8vw] h-[42vh] w-[50vw] rounded-full bg-aurora-2 opacity-30 blur-[90px] animate-aurora"
        style={{ animationDelay: "-9s" }}
      />
      <span
        className="absolute top-[34vh] right-[18vw] h-[30vh] w-[34vw] rounded-full bg-aurora-3 opacity-30 blur-[90px] animate-aurora"
        style={{ animationDelay: "-4s" }}
      />

      {/* shooting star */}
      <span className="absolute top-[18%] -left-[10%] h-px w-[130px] -rotate-[18deg] bg-linear-to-r from-transparent to-starlight opacity-0 animate-shoot" />

      {/* twinkling starfield */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-starlight animate-twinkle"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: s.left,
            top: s.top,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default NightSky;
