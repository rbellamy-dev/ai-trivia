import type { Metadata, Viewport } from "next";
import { Anton, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Card Table · Trivia",
  description:
    "Pick a deck, play your hand. Ten questions dealt one card at a time; every hit takes the trick.",
};

export const viewport: Viewport = {
  themeColor: "#145a3a", // --color-felt (metadata cannot read CSS variables)
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${atkinson.variable}`}>
      <body>{children}</body>
    </html>
  );
}
