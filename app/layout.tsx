import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Careers at Caliber Business Resource | Join Our Team",
  description: "Explore exciting career opportunities at Caliber Business Resource. Join our team of professionals in Bohol, Philippines. Open roles in customer service, marketing, tech support, and more.",
  keywords: ["Caliber Business Resource", "careers", "jobs", "Bohol", "Philippines", "customer service", "BPO jobs", "tech support", "marketing"],
  authors: [{ name: "Caliber Business Resource" }],
  openGraph: {
    title: "Careers at Caliber Business Resource",
    description: "Let's build your back office and team NOW. Join our growing team in Bohol, Philippines.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Caliber Business Resource",
    description: "Explore exciting career opportunities in Bohol, Philippines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Phase 4: Security Headers via Meta Tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}