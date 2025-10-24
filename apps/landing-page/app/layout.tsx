import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAPR Ballistics - Precision Ballistics Made Simple",
  description: "Professional-grade ballistics calculators for shooters, hunters, and enthusiasts. Get accurate trajectory calculations with real-time data.",
  keywords: "ballistics, calculator, trajectory, shooting, hunting, precision, MOA, ballistics coefficient",
  openGraph: {
    title: "VAPR Ballistics - Precision Ballistics Made Simple",
    description: "Professional-grade ballistics calculators for shooters, hunters, and enthusiasts.",
    url: "https://vaprballistics.com",
    siteName: "VAPR Ballistics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
