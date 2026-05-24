import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import type { Product } from "@/lib/api";

export const dynamic = "force-dynamic";

const BASE = "https://westra.in";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API}/products?in_stock=true`, { cache: "no-store" });
    if (!res.ok) return [];
    const data: Product[] = await res.json();
    return data.slice(0, 8);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Westra Wear — Handpicked Women's Fashion, Live Sales & More",
  description:
    "Welcome to Westra Wear — your go-to destination for premium women's ethnic and fusion fashion. Shop co-ord sets, kaftans, salwar suits, frocks, tops & more. Join our Facebook Live sales every week and discover new arrivals first.",
  keywords: [
    "Westra Wear", "women's fashion online India", "co-ord set", "kaftan women",
    "salwar suit online", "ethnic wear women", "Facebook live shopping",
    "Instagram fashion India", "designer women's wear Kolkata",
    "two piece set women India", "women frocks online", "latest fashion women",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE,
    siteName: "Westra Wear",
    title: "Westra Wear — Handpicked Women's Fashion, Live Sales & More",
    description:
      "Shop handpicked women's ethnic & fusion fashion. Co-ord sets, kaftans, salwars, frocks & more. Live sales every week on Facebook.",
    images: [{ url: `${BASE}/og-home.jpg`, width: 1200, height: 630, alt: "Westra Wear — Women's Fashion" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@westra_wear",
    title: "Westra Wear — Handpicked Women's Fashion",
    description: "Premium women's fashion — live sales every week on Facebook & Instagram.",
    images: [`${BASE}/og-home.jpg`],
  },
};
import FeaturedCollections from "@/components/FeaturedCollections";
import ShopTeaser from "@/components/ShopTeaser";
import AboutSection from "@/components/AboutSection";
import LiveShoppingSection from "@/components/LiveShoppingSection";
import InstagramShowcase from "@/components/InstagramShowcase";
import Testimonials from "@/components/Testimonials";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts();
  return (
    <>
      <HeroSection />
      <ShopTeaser initialProducts={featuredProducts} />
      <FeaturedCollections />
      <AboutSection />
      <LiveShoppingSection />
      <InstagramShowcase />
      <Testimonials />
      <WhatsAppCTA />
    </>
  );
}
