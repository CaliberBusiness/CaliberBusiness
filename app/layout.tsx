import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.caliberbusinessresource.com'),
  title: {
    default: "Philippines Outsourcing & Remote Staffing | Caliber Business Resource",
    template: "%s | Caliber Business Resource"
  },
  description: "Hire dedicated remote teams from the Philippines. Caliber Business Resource offers fully managed BPO staffing for customer support, data entry, accounting, and tech support. Get a free quote.",
  keywords: ["Philippines outsourcing company", "remote staffing Philippines", "BPO services Philippines", "offshore team Philippines", "Caliber Business Resource", "micro call center", "outsource customer service Philippines", "hire virtual assistants Philippines"],
  authors: [{ name: "Caliber Business Resource" }],
  openGraph: {
    title: "Philippines Outsourcing & Remote Staffing | Caliber Business Resource",
    description: "Hire dedicated remote teams from the Philippines. Caliber Business Resource offers fully managed BPO staffing for customer support, data entry, accounting, and tech support.",
    url: 'https://www.caliberbusinessresource.com',
    siteName: 'Caliber Business Resource',
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philippines Outsourcing & Remote Staffing | Caliber Business Resource",
    description: "Hire dedicated remote teams from the Philippines. Fully managed BPO staffing for customer support, data entry, accounting, and tech support.",
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
      <body className="font-sans antialiased">
        {children}
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3D7T4HGGG3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3D7T4HGGG3');
          `}
        </Script>
      </body>
    </html>
  );
}