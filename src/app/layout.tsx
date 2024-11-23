import type { Metadata } from "next";
import "./globals.css"; // Global CSS import
import "@fortawesome/fontawesome-svg-core/styles.css"; // Font Awesome CSS import
import { config } from "@fortawesome/fontawesome-svg-core";

// Disable auto-adding CSS
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Virtual Lab",
  description: "Online Science Lab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
