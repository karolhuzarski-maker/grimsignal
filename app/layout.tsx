import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grim-signal-labs.karhuz.chatgpt.site"),
  title: "GRIM SIGNAL LABS — Multisensor Footage for Physical AI",
  description:
    "Rights-cleared RGB, thermal, aerial, ground and responder-view footage for computer vision, robotics and R&D.",
  icons: {
    icon: "/grim-signal-labs-logo.png",
    shortcut: "/grim-signal-labs-logo.png",
  },
  openGraph: {
    title: "GRIM SIGNAL LABS — Capture the scene you can’t download.",
    description:
      "Real-world, synchronized multisensor footage for computer vision, robotics and R&D.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GRIM SIGNAL LABS — Multisensor footage for Physical AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRIM SIGNAL LABS — Capture the scene you can’t download.",
    description:
      "Real-world, synchronized multisensor footage for computer vision, robotics and R&D.",
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
