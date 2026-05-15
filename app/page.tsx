import HeroSection from "@/components/HeroSection";
import FeaturedCollections from "@/components/FeaturedCollections";
import ShopTeaser from "@/components/ShopTeaser";
import AboutSection from "@/components/AboutSection";
import LiveShoppingSection from "@/components/LiveShoppingSection";
import InstagramShowcase from "@/components/InstagramShowcase";
import Testimonials from "@/components/Testimonials";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShopTeaser />
      <FeaturedCollections />
      <AboutSection />
      <LiveShoppingSection />
      <InstagramShowcase />
      <Testimonials />
      <WhatsAppCTA />
    </>
  );
}
