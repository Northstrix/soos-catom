import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOOS CATOM",
  description: "An experimental app that can fit a multi-page website into a single page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
