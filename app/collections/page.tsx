import type { Metadata } from "next";
import CollectionsHero from "./CollectionsHero";
import { FaArrowRight, FaWhatsapp, FaFacebook } from "react-icons/fa";
import Image from "next/image";

const BASE = "https://westra.in";

export const metadata: Metadata = {
  title: "Our Collections | Curated Women's Fashion | Westra Wear",
  description: "Explore Westra Wear's curated fashion collections. Each collection is thoughtfully handpicked to blend tradition with contemporary style — ethnic wear, fusion sets, occasion wear and everyday looks.",
  keywords: ["women's fashion collections India", "ethnic wear collections", "fusion fashion women", "occasion wear women India", "salwar collection online", "co-ord set collection", "festive wear women", "Westra Wear collections"],
  alternates: { canonical: `${BASE}/collections` },
  openGraph: { type: "website", locale: "en_IN", url: `${BASE}/collections`, siteName: "Westra Wear", title: "Our Collections | Westra Wear", description: "Handpicked ethnic, fusion, and designer women's fashion collections.", images: [{ url: `${BASE}/og-collections.jpg`, width: 1200, height: 630, alt: "Westra Wear Collections" }] },
  twitter: { card: "summary_large_image", site: "@westra_wear", title: "Our Collections | Westra Wear", description: "Curated ethnic, fusion & designer women's fashion collections.", images: [`${BASE}/og-collections.jpg`] },
};

const categories = [
  { id: "cord-set",   index: "01", name: "Co-ord Set",  tagline: "Co-ordinated Perfection",  accent: "#C6A77D", image: "https://cdn.westra.in/cdn-cgi/image/width=1920,quality=60,format=avif/co-ord-set.png", description: "Effortlessly matched co-ord sets that create a complete, polished look in seconds. Crafted in premium fabrics with meticulous attention to fit and finish.", items: ["Casual co-ord Sets", "Printed Sets", "Embroidered Sets", "Solid Tone Sets", "Linen co-ord Sets", "Party co-ord Sets"] },
  { id: "kaftan",     index: "02", name: "Kaftan",       tagline: "Breezy, Free & Beautiful", accent: "#9B6335", image: "https://cdn.westra.in/cdn-cgi/image/width=1920,quality=60,format=avif/kaftan.png", description: "Flowing kaftans that drape with effortless grace — from beach resort mornings to evening gatherings. Each piece is chosen for its fabric quality and movement.", items: ["Printed Kaftans", "Embroidered Kaftans", "Solid Kaftans", "Short Kaftans", "Maxi Kaftans", "Occasion Kaftans"] },
  { id: "salwar",     index: "03", name: "Salwar",       tagline: "Rooted in Grace",          accent: "#8C7E72", image: "https://cdn.westra.in/cdn-cgi/image/width=1920,quality=60,format=avif/salwar.png", description: "Classic salwar silhouettes reimagined with contemporary design sensibility. From everyday comfort wear to festive-ready sets.", items: ["Salwar Kameez", "Patiala Sets", "Palazzo Salwar", "Printed Sets", "Embroidered Sets", "Dupatta Sets"] },
  { id: "two-piece",  index: "04", name: "Two Piece",    tagline: "Mix, Match & Own It",      accent: "#C6A77D", image: null, description: "Versatile two-piece sets designed to take you seamlessly from casual afternoons to evening outings. Mix and match, or wear as a set.", items: ["Crop Top Sets", "Co-ord Sets", "Printed Two Piece", "Embellished Sets", "Linen Sets", "Festive Two Piece"] },
  { id: "tops",       index: "05", name: "Tops",         tagline: "Everyday Elegance",        accent: "#9B6335", image: "https://cdn.westra.in/cdn-cgi/image/width=1920,quality=60,format=avif/tops.png", description: "A thoughtfully curated range of tops — from relaxed everyday basics to statement embellished styles. The foundation of every great outfit.", items: ["Casual Tops", "Printed Tops", "Embroidered Tops", "Crop Tops", "Flowy Tops", "Party Tops"] },
  { id: "bottoms",    index: "06", name: "Bottoms",      tagline: "Grounded in Style",        accent: "#C6A77D", image: null, description: "Beautifully tailored bottoms — from relaxed palazzos to sleek trousers. The perfect foundation to complete every look.", items: ["Palazzos", "Trousers", "Skirts", "Culottes", "Harem Pants", "Printed Bottoms"] },
  { id: "shirts",     index: "07", name: "Shirts",       tagline: "Polished & Refined",       accent: "#8C7E72", image: null, description: "Crisp, feminine shirts crafted in premium fabrics for every occasion. From relaxed linen styles to tailored button-downs.", items: ["Linen Shirts", "Printed Shirts", "Oversized Shirts", "Embroidered Shirts", "Formal Shirts", "Casual Shirts"] },
  { id: "frocks",     index: "08", name: "Frocks",       tagline: "Playful Meets Chic",       accent: "#C6A77D", image: null, description: "Beautifully crafted frocks that blend playful charm with modern silhouettes. From flirty minis to elegant maxis — there's a frock for every mood.", items: ["Casual Frocks", "Printed Frocks", "Embroidered Frocks", "Maxi Frocks", "Party Frocks", "Linen Frocks"] },
];

export default function CollectionsPage() {
  return (
    <div style={{ background: "var(--bg)" }}>
      <CollectionsHero />

      {/* Quick nav */}
      <div className="border-b sticky top-[60px] z-30 hidden md:flex" style={{ background: "rgba(248,244,238,0.96)", borderColor: "rgba(155,99,53,0.1)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="flex items-center gap-0">
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="font-inter text-[10px] tracking-[0.25em] uppercase px-5 py-4 border-r transition-colors duration-200 hover:text-[var(--gold)]" style={{ color: "var(--text-light)", borderColor: "rgba(155,99,53,0.1)" }}>
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Collection chapters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="py-8 md:py-16 md:pb-8">
            <div className="flex items-baseline gap-4 md:gap-6 mb-8 md:mb-14">
              <span className="font-inter text-xs" style={{ color: "var(--text-light)" }}>{cat.index}</span>
              <div className="flex-1 h-px" style={{ background: "rgba(155,99,53,0.15)" }} />
              <span className="font-inter text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>{cat.tagline}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-playfair leading-[0.9]" style={{ fontSize: "clamp(52px, 6vw, 96px)", color: "var(--text-dark)", letterSpacing: "-0.03em" }}>{cat.name}</h2>
                <div className="mt-6 w-16 h-[3px] rounded-full" style={{ background: cat.accent }} />
                {cat.image && (
                  <div className="mt-8 relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      objectPosition="center 10%"
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                )}
              </div>
              <div className="lg:col-span-7 flex flex-col gap-8 lg:pt-3">
                <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="px-4 py-1.5 font-inter text-[10px] tracking-wide rounded-sm" style={{ background: `${cat.accent}12`, color: "var(--text-mid)", border: `1px solid ${cat.accent}28` }}>{item}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="https://www.facebook.com/share/1BWf44pd5s/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 bg-gold-gradient text-white font-inter text-[10px] tracking-[0.25em] uppercase hover:opacity-90 transition-opacity">
                    <FaFacebook size={11} /> Watch Live <FaArrowRight size={10} />
                  </a>
                  <a href="https://wa.me/917501182583" target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex items-center gap-2 px-7 py-3 font-inter text-[10px] tracking-[0.25em] uppercase" style={{ border: `1px solid ${cat.accent}60`, color: "var(--text-dark)" }}>
                    <FaWhatsapp size={11} /> Enquire
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-14 md:py-28" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Not found what you&apos;re looking for?</p>
              <h3 className="font-playfair leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 56px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}>
                We carry pieces not yet listed online.
                <em className="block" style={{ color: "var(--gold)" }}>Message us directly.</em>
              </h3>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a href="https://wa.me/917501182583" target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex items-center gap-3 px-10 py-4 bg-gold-gradient text-white font-inter text-xs tracking-[0.25em] uppercase">
                <FaWhatsapp size={14} /> Message on WhatsApp <FaArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
