import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { TRIP } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${TRIP.guestOfHonor}'s Send-Off | ${TRIP.city}, ${TRIP.country}`,
  description: `Best-man planning hub for ${TRIP.guestOfHonor}'s bachelor trip. Pick your week, lock your spot.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
