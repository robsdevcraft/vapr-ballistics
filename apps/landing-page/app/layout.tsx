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
  title: "VAPR Ballistics - Open Source Ballistics Built for Privacy",
  description: "Free and open-source ballistics calculators under active development. Your data stays on your device. No tracking, no accounts, no compromises.",
  keywords: "ballistics, calculator, trajectory, shooting, hunting, precision, MOA, ballistics coefficient, open source, privacy",
  openGraph: {
    title: "VAPR Ballistics - Open Source Ballistics Built for Privacy",
    description: "Free and open-source ballistics calculators. Your data stays on your device. No tracking, no accounts.",
    url: "https://vaprballistics.com",
    siteName: "VAPR Ballistics",
    type: "website",
  },
  icons: {
    icon: '/icon.svg',
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
