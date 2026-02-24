import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060a12',
};

export const metadata: Metadata = {
  title: "Discover Your Akutar | The Akuverse Quiz",
  description: "12 questions. Real astronaut insights. Find the Akutar that matches your spirit. From the universe of Micah Johnson's Aku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#060a12]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-400 focus:text-black focus:rounded-sm focus:font-condensed focus:text-sm focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
