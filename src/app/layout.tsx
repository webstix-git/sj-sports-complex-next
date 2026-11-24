import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./responsive.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "St. Joseph Youth Sports Foundation",
  description:
    "A parent-led 501(c)(3) nonprofit giving St. Joseph kids of every ability a place to practice, compete and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`} suppressHydrationWarning>
      <body className={`${montserrat.className} min-h-full antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
