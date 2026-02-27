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
import { getHomepageData } from "@/lib/getHomepageData";

export default function Home() {
  const data = getHomepageData();

  return (
    <main className="min-h-screen bg-background">
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
      <ContactForm />

      <Footer data={data.footer} />
      <ScrollToTop />
      <FloatingContact />
    </main>
  );
}
