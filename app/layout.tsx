import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://caliber-business.vercel.app'),
  title: {
    default: "Caliber Business Resource | Premium Remote Staffing",
    template: "%s | Caliber Business Resource"
  },
  description: "Scale your business with premium remote staffing and micro call center solutions from the Philippines. Access top-tier talent for customer service, tech support, and back-office operations.",
  keywords: ["Caliber Business Resource", "BPO", "remote staffing", "offshore team", "Philippines outsourcing", "micro call center", "virtual assistants", "customer support outsourcing"],
  authors: [{ name: "Caliber Business Resource" }],
  openGraph: {
    title: "Caliber Business Resource | Premium Remote Staffing",
    description: "Scale your business with premium remote staffing and micro call center solutions from the Philippines.",
    url: 'https://caliber-business.vercel.app',
    siteName: 'Caliber Business Resource',
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caliber Business Resource | Premium Remote Staffing",
    description: "Scale your business with premium remote staffing and micro call center solutions from the Philippines.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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