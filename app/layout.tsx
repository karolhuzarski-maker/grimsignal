import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grim-signal-labs.karhuz.chatgpt.site"),
  title: "GRIM SIGNAL LABS — Real-World Data for Physical AI",
  description:
    "Rights-cleared RGB, thermal, ground and responder-view datasets for computer vision, autonomous systems and mission-critical AI.",
  icons: {
    icon: "/grim-signal-labs-logo.png",
    shortcut: "/grim-signal-labs-logo.png",
  },
  openGraph: {
    title: "GRIM SIGNAL LABS — Train for the scene you can’t download.",
    description:
      "Real-world, synchronized multimodal data for computer vision and autonomous systems.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GRIM SIGNAL LABS — Real-world data for Physical AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRIM SIGNAL LABS — Train for the scene you can’t download.",
    description:
      "Real-world, synchronized multimodal data for computer vision and autonomous systems.",
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
