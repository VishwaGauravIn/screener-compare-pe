import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compare PE of Companies - ProScreener",
  description:
    "use this to compare PE ratios of different companies over time. a tool by Vishwa Gaurav, part of ProScreener.",
  generator: "@VishwaGauravIn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
