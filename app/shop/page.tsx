import type { Metadata } from "next";
import ProductGrid from "./ProductGrid";
import type { Product } from "@/lib/api";

export const dynamic = "force-dynamic";

const BASE = "https://westra.in";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Shop Women's Fashion Online | Westra Wear",
  description: "Browse and shop Westra Wear's curated women's fashion online. Handpicked ethnic wear, fusion sets, tops, kaftans, co-ord sets and more — delivered across India.",
  keywords: ["shop women's fashion online India", "buy ethnic wear online", "women's clothing online India", "buy kaftans online", "Westra Wear shop"],
  alternates: { canonical: `${BASE}/shop` },
  openGraph: { type: "website", locale: "en_IN", url: `${BASE}/shop`, siteName: "Westra Wear", title: "Shop Women's Fashion Online | Westra Wear", description: "Browse Westra Wear's curated women's fashion.", images: [{ url: `${BASE}/og-shop.jpg`, width: 1200, height: 630, alt: "Westra Wear Shop" }] },
  twitter: { card: "summary_large_image", site: "@westra_wear", title: "Shop Women's Fashion Online | Westra Wear", description: "Curated women's fashion.", images: [`${BASE}/og-shop.jpg`] },
};

export default async function ShopPage() {
  const products = await fetchProducts();
  return (
    <div style={{ background: "var(--bg)" }}>
      <section
        className="relative flex flex-col justify-end px-8 md:px-16 lg:px-24"
        style={{ height: "52vh", minHeight: 320, background: "radial-gradient(ellipse at 60% 40%, rgba(155,99,53,0.08) 0%, transparent 65%), var(--bg)", borderBottom: "1px solid rgba(155,99,53,0.08)" }}
      >
        <span className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-playfair select-none pointer-events-none" style={{ fontSize: "clamp(80px, 14vw, 200px)", color: "rgba(155,99,53,0.04)", lineHeight: 1, letterSpacing: "-0.05em", fontStyle: "italic" }} aria-hidden>Shop</span>
        <div className="relative z-10 pb-10 md:pb-14">
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>New arrivals every week</p>
          <h1 className="font-playfair" style={{ fontSize: "clamp(40px, 5.5vw, 88px)", color: "var(--text-dark)", letterSpacing: "-0.03em", lineHeight: 0.9 }}>
            Shop <em style={{ color: "var(--gold)" }}>Westra</em>
          </h1>
          <p className="mt-5 font-inter text-sm max-w-xl" style={{ color: "var(--text-light)", lineHeight: 1.8 }}>Every piece handpicked for quality, fit and style. Browse our full catalogue — filter by category and find your perfect look.</p>
        </div>
      </section>
      <ProductGrid initialProducts={products} />
    </div>
  );
}
