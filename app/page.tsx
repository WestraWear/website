import HeroSection from "@/components/HeroSection";
import FeaturedCollections from "@/components/FeaturedCollections";
import AboutSection from "@/components/AboutSection";
import LiveShoppingSection from "@/components/LiveShoppingSection";
import InstagramShowcase from "@/components/InstagramShowcase";
import Testimonials from "@/components/Testimonials";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <AboutSection />
      <LiveShoppingSection />
      <InstagramShowcase />
      <Testimonials />
      <WhatsAppCTA />
    </>
  );
}
