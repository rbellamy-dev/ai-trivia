import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Permanent_Marker } from "next/font/google";
import "./globals.css";

// One superfamily: Plex Sans for everything you read, Plex Mono for
// film-edge data (question numbers).
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snapshot Trivia",
  description:
    "A photo trivia game. Pick a topic and answer ten fresh questions, each with its own photo, then see how you did on a contact sheet.",
};

export const viewport: Viewport = {
  themeColor: "#f3efe7", // --color-table (metadata cannot read CSS variables)
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${marker.variable}`}
      // The inline script below may add data-resuming before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* A round saved before a refresh: hide the page until it's restored,
            so the roll picker doesn't flash first. Trivia clears the flag. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("snapshot-round"))document.documentElement.dataset.resuming=""}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
