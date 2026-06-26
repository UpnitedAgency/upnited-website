import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedTalent } from "@/components/home/FeaturedTalent";
import { Portfolio } from "@/components/home/Portfolio";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <ServicesOverview />
      <FeaturedTalent />
      <Portfolio />
      <Testimonials />
      <CTA />
      <ContactSection />
    </>
  );
}
