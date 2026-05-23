"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaWhatsapp, FaFacebook } from "react-icons/fa";

const categories = [
  {
    id: "cord-set",
    index: "01",
    name: "Co-ord Set",
    tagline: "Co-ordinated Perfection",
    description:
      "Effortlessly matched co-ord sets that create a complete, polished look in seconds. Crafted in premium fabrics with meticulous attention to fit and finish — the ultimate easy-dressing essential.",
    accent: "#C6A77D",
    items: ["Casual co-ord Sets", "Printed Sets", "Embroidered Sets", "Solid Tone Sets", "Linen co-ord Sets", "Party co-ord Sets"],
  },
  {
    id: "kaftan",
    index: "02",
    name: "Kaftan",
    tagline: "Breezy, Free & Beautiful",
    description:
      "Flowing kaftans that drape with effortless grace — from beach resort mornings to evening gatherings. Each piece is chosen for its fabric quality, movement, and the quiet confidence it carries.",
    accent: "#9B6335",
    items: ["Printed Kaftans", "Embroidered Kaftans", "Solid Kaftans", "Short Kaftans", "Maxi Kaftans", "Occasion Kaftans"],
  },
  {
    id: "salwar",
    index: "03",
    name: "Salwar",
    tagline: "Rooted in Grace",
    description:
      "Classic salwar silhouettes reimagined with contemporary design sensibility. From everyday comfort wear to festive-ready sets, each piece honours tradition while embracing the modern woman's wardrobe.",
    accent: "#8C7E72",
    items: ["Salwar Kameez", "Patiala Sets", "Palazzo Salwar", "Printed Sets", "Embroidered Sets", "Dupatta Sets"],
  },
  {
    id: "two-piece",
    index: "04",
    name: "Two Piece",
    tagline: "Mix, Match & Own It",
    description:
      "Versatile two-piece sets designed to take you seamlessly from casual afternoons to evening outings. Mix and match, or wear as a set — endlessly wearable and effortlessly stylish.",
    accent: "#C6A77D",
    items: ["Crop Top Sets", "Co-ord Sets", "Printed Two Piece", "Embellished Sets", "Linen Sets", "Festive Two Piece"],
  },
  {
    id: "tops",
    index: "05",
    name: "Tops",
    tagline: "Everyday Elegance",
    description:
      "A thoughtfully curated range of tops — from relaxed everyday basics to statement embellished styles. The foundation of every great outfit, crafted with care and attention to detail.",
    accent: "#9B6335",
    items: ["Casual Tops", "Printed Tops", "Embroidered Tops", "Crop Tops", "Flowy Tops", "Party Tops"],
  },
  {
    id: "shirts",
    index: "06",
    name: "Shirts",
    tagline: "Polished & Refined",
    description:
      "Crisp, feminine shirts crafted in premium fabrics for every occasion. From relaxed linen styles to tailored button-downs — smart dressing made effortless.",
    accent: "#8C7E72",
    items: ["Linen Shirts", "Printed Shirts", "Oversized Shirts", "Embroidered Shirts", "Formal Shirts", "Casual Shirts"],
  },
  {
    id: "frocks",
    index: "07",
    name: "Frocks",
    tagline: "Playful Meets Chic",
    description:
      "Beautifully crafted frocks that blend playful charm with modern silhouettes. From flirty minis to elegant maxis — there's a frock for every mood and moment.",
    accent: "#C6A77D",
    items: ["Casual Frocks", "Printed Frocks", "Embroidered Frocks", "Maxi Frocks", "Party Frocks", "Linen Frocks"],
  },
];

export default function CollectionsPage() {
  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="relative min-h-[60vh] flex items-end overflow-hidden pt-24"
        style={{ background: "var(--bg-section)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(var(--gold) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
            <span
              className="font-inter text-[9px] tracking-[0.5em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Westra Fashion House
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-playfair leading-[0.9] mb-8"
            style={{
              fontSize: "clamp(56px, 9vw, 140px)",
              color: "var(--text-dark)",
              letterSpacing: "-0.02em",
            }}
          >
            Our
            <br />
            <em style={{ color: "var(--gold)" }}>Collections</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-2xl italic max-w-xl leading-relaxed"
            style={{ color: "var(--text-mid)" }}
          >
            A curated universe of women&apos;s fashion, crafted to celebrate every
            facet of your unique beauty.
          </motion.p>
        </div>
      </section>

      {/* ── Quick nav ────────────────────────────────── */}
      <div
        className="border-b sticky top-[60px] z-30 hidden md:flex"
        style={{ background: "rgba(248,244,238,0.96)", borderColor: "rgba(155,99,53,0.1)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="flex items-center gap-0">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="font-inter text-[10px] tracking-[0.25em] uppercase px-5 py-4 border-r transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: "var(--text-light)", borderColor: "rgba(155,99,53,0.1)" }}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Collection chapters ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        {categories.map((cat, i) => (
          <motion.section
            key={cat.id}
            id={cat.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-12 md:py-24 md:pb-8"
            style={{ borderColor: "rgba(155,99,53,0.12)" }}
          >
            {/* Chapter header row */}
            <div className="flex items-baseline gap-4 md:gap-6 mb-8 md:mb-14">
              <span
                className="font-inter text-xs"
                style={{ color: "var(--text-light)" }}
              >
                {cat.index}
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(155,99,53,0.15)" }} />
              <span
                className="font-inter text-[9px] tracking-[0.4em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                {cat.tagline}
              </span>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Collection name — large editorial */}
              <div className="lg:col-span-5">
                <h2
                  className="font-playfair leading-[0.9]"
                  style={{
                    fontSize: "clamp(52px, 6vw, 96px)",
                    color: "var(--text-dark)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {cat.name}
                </h2>

                {/* Accent bar */}
                <div
                  className="mt-6 w-16 h-[3px] rounded-full"
                  style={{ background: cat.accent }}
                />
              </div>

              {/* Description + details */}
              <div className="lg:col-span-7 flex flex-col gap-8 lg:pt-3">
                <p
                  className="font-inter text-sm leading-8"
                  style={{ color: "var(--text-light)" }}
                >
                  {cat.description}
                </p>

                {/* Style tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-1.5 font-inter text-[10px] tracking-wide rounded-sm"
                      style={{
                        background: `${cat.accent}12`,
                        color: "var(--text-mid)",
                        border: `1px solid ${cat.accent}28`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://www.facebook.com/share/1BWf44pd5s/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-gold-gradient text-white font-inter text-[10px] tracking-[0.25em] uppercase hover:opacity-90 transition-opacity"
                  >
                    <FaFacebook size={11} />
                    Watch Live
                    <FaArrowRight size={10} />
                  </a>
                  <a
                    href="https://wa.me/917501182583"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp inline-flex items-center gap-2 px-7 py-3 font-inter text-[10px] tracking-[0.25em] uppercase"
                    style={{
                      border: `1px solid ${cat.accent}60`,
                      color: "var(--text-dark)",
                    }}
                  >
                    <FaWhatsapp size={11} />
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section
        className="py-14 md:py-28"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <p
                className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4"
                style={{ color: "var(--gold)" }}
              >
                Not found what you&apos;re looking for?
              </p>
              <h3
                className="font-playfair leading-tight"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 56px)",
                  color: "var(--text-dark)",
                  letterSpacing: "-0.02em",
                }}
              >
                We carry pieces not yet listed online.
                <em className="block" style={{ color: "var(--gold)" }}>
                  Message us directly.
                </em>
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4 flex justify-start lg:justify-end"
            >
              <a
                href="https://wa.me/917501182583"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center gap-3 px-10 py-4 bg-gold-gradient text-white font-inter text-xs tracking-[0.25em] uppercase"
              >
                <FaWhatsapp size={14} />
                Message on WhatsApp
                <FaArrowRight size={12} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
