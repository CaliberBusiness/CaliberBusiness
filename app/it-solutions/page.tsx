import { Metadata } from "next";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";

import ITHero from "@/components/it-solutions/ITHero";
import HireVsBuild from "@/components/it-solutions/HireVsBuild";
import WhoItsFor from "@/components/it-solutions/WhoItsFor";
import ITServices from "@/components/it-solutions/ITServices";
import WhatWeLookFor from "@/components/it-solutions/WhatWeLookFor";
import MonthlyPlan from "@/components/it-solutions/MonthlyPlan";
import HowSupportWorks from "@/components/it-solutions/HowSupportWorks";
import SystemsStayYours from "@/components/it-solutions/SystemsStayYours";
import ITPortfolio from "@/components/it-solutions/ITPortfolio";
import ITTestimonial from "@/components/it-solutions/ITTestimonial";
import HowItStarts from "@/components/it-solutions/HowItStarts";
import ITFaq from "@/components/it-solutions/ITFaq";
import ITContactForm from "@/components/it-solutions/ITContactForm";

import { getHomepageData } from "@/lib/getHomepageData";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { IT_SEO, IT_FAQ_ITEMS, approvedOnly, itServiceNames } from "@/lib/it-solutions";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | Caliber Business Resource"
  // template, which would push this title past the ~65-character budget the
  // rest of the site is held to. See lib/it-solutions.ts.
  title: { absolute: IT_SEO.title },
  description: IT_SEO.description,
  alternates: {
    canonical: IT_SEO.path,
  },
  // Next.js REPLACES (does not merge) openGraph/twitter from a parent layout,
  // so every field has to be restated here or it is silently dropped.
  openGraph: {
    title: IT_SEO.title,
    description: IT_SEO.description,
    url: `${SITE_URL}${IT_SEO.path}`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: IT_SEO.title,
    description: IT_SEO.description,
  },
};

export default function ITSolutions() {
  const data = getHomepageData();

  // Service names only, flags respected. Deliberately no prices, ratings,
  // addresses or availability claims — nothing here that the page itself
  // does not say in plain text.
  const services = itServiceNames();

  // Built from the SAME call ITFaq renders from, so an unapproved answer can
  // never reach structured data. An empty list drops the FAQPage node
  // entirely rather than publishing an empty one.
  const faqItems = approvedOnly(IT_FAQ_ITEMS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "name": "IT Solutions",
        "itemListElement": services.map((name, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": name,
            "provider": {
              "@type": "Organization",
              "name": SITE_NAME,
              "url": SITE_URL,
            },
          },
        })),
      },
      ...(faqItems.length > 0
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": faqItems.map((item) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <ITHero />
      <HireVsBuild />
      <WhoItsFor />
      <ITServices />
      <WhatWeLookFor />
      <MonthlyPlan />
      <HowSupportWorks />
      <SystemsStayYours />
      <ITPortfolio />
      <ITTestimonial />
      <HowItStarts />
      <ITFaq />
      <ITContactForm />

      <Footer data={data.footer} />
      <ScrollToTop />
      <FloatingContact />
    </main>
  );
}
