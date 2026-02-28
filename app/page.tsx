import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Credibility from "@/components/Credibility";
import Statistics from "@/components/Statistics";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import JobListings from "@/components/JobListings";
import About from "@/components/About";
import Differentiation from "@/components/Differentiation";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import CultureSection from "@/components/CultureSection";
import GoogleMapsSection from "@/components/GoogleMapsSection";
import FAQ from "@/components/FAQ";
import { getHomepageData } from "@/lib/getHomepageData";

export async function generateMetadata(): Promise<Metadata> {
  const data = getHomepageData();
  return {
    title: data.seo?.title || "Philippines Outsourcing & Remote Staffing | Caliber Business Resource",
    description: data.seo?.description || "Hire dedicated remote teams from the Philippines. Fully managed BPO staffing for customer support, data entry, accounting, and tech support.",
    openGraph: {
      title: data.seo?.title || "Philippines Outsourcing & Remote Staffing | Caliber Business Resource",
      description: data.seo?.description,
    },
    twitter: {
      title: data.seo?.title || "Philippines Outsourcing & Remote Staffing | Caliber Business Resource",
      description: data.seo?.description,
    }
  };
}

export default function Home() {
  const data = getHomepageData();

  // Generate Organization and LocalBusiness Schema using CMS data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.caliberbusinessresource.com/#organization",
        "name": "Caliber Business Resource",
        "url": "https://www.caliberbusinessresource.com",
        "logo": "https://www.caliberbusinessresource.com/images/logo.jpg",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": data.footer.phoneRaw,
          "contactType": "Customer Service"
        },
        "sameAs": [
          "https://www.linkedin.com/company/caliber-business-resource-bpo-inc/"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.caliberbusinessresource.com/#localbusiness",
        "name": "Caliber Business Resource",
        "image": "https://www.caliberbusinessresource.com/images/logo.jpg",
        "telephone": data.footer.phoneRaw,
        "email": `${data.footer.emailUser}@${data.footer.emailDomain}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ruberen Complex, Venancio P. Inting Avenue",
          "addressLocality": "Tagbilaran City",
          "addressRegion": "Bohol",
          "addressCountry": "PH"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faq?.items?.map((item: { question: string; answer: string }) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        })) || []
      }
    ]
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />
      <Hero data={data.hero} />
      <Credibility data={data.credibility} />
      <Statistics data={data.statistics} />
      <Services data={data.services} />
      <HowItWorks data={data.howItWorks} />
      <CultureSection data={data.culture} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <JobListings data={data.jobListings} />
      </div>

      <About data={data.about} />
      <GoogleMapsSection data={data.googleMaps} />
      <Differentiation data={data.differentiation} />
      {data.faq && <FAQ data={data.faq} />}
      <ContactForm />

      <Footer data={data.footer} />
      <ScrollToTop />
      <FloatingContact />
    </main>
  );
}
