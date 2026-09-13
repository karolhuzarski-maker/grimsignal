import type { Metadata } from "next";
import "./globals.css";
import "./contact-readability.css";
import "./mobile-hero.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grim-signal-labs.karhuz.chatgpt.site"),
  title: "GRIM SIGNAL LABS — Custom Edge-Case Datasets for AI / CV",
  description:
    "Custom real-world multisensor datasets for AI and computer vision, focused on mass-casualty, search & rescue and complex field environments.",
  icons: {
    icon: [{ url: "/favicon.svg?v=3", type: "image/svg+xml" }],
    shortcut: "/favicon.svg?v=3",
  },
  openGraph: {
    title: "GRIM SIGNAL LABS — The edge cases your model is missing.",
    description:
      "Custom RGB, thermal, UAV, ground and responder-view datasets for difficult real-world AI/CV failure modes.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GRIM SIGNAL LABS — Custom edge-case datasets for AI / CV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRIM SIGNAL LABS — The edge cases your model is missing.",
    description:
      "Custom RGB, thermal, UAV, ground and responder-view datasets for difficult real-world AI/CV failure modes.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
