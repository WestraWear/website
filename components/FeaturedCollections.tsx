"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const collections = [
  {
    name: "Sarees",
    tagline: "Timeless drapes, modern soul",
    description: "Handpicked sarees from across India's finest weaving traditions.",
    index: "01",
    href: "/collections#sarees",
  },
  {
    name: "Kurtis",
    tagline: "Effortless everyday elegance",
    description: "Contemporary silhouettes crafted for the modern woman's wardrobe.",
    index: "02",
    href: "/collections#kurtis",
  },
  {
    name: "Ethnic Wear",
    tagline: "Cultural roots, refined style",
    description: "Celebrate tradition with curated ethnic ensembles and coordinates.",
    index: "03",
    href: "/collections#ethnic",
  },
  {
    name: "Party Collection",
    tagline: "Dress to mesmerize",
    description: "Statement pieces designed to turn heads at every celebration.",
    index: "04",
    href: "/collections#party",
  },
  {
    name: "Seasonal",
    tagline: "Fresh every season",
    description: "Curated seasonal drops inspired by the colours of nature.",
    index: "05",
    href: "/collections#seasonal",
  },
];

export default function FeaturedCollections() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8" ref={ref}>
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
            </div>
            <h2
              className="font-playfair leading-tight"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              Curated
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>for You</em>
            </h2>
          </div>
          <div className="max-w-xs">
            <p
              className="font-inter text-sm leading-7"
              style={{ color: "var(--text-light)" }}
            >
              Each collection is thoughtfully assembled to celebrate femininity,
              craftsmanship, and the joy of beautiful dressing.
            </p>
            <Link
              href="/collections"
              className="group mt-6 font-inter text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 transition-opacity duration-300 hover:opacity-60 inline-flex"
              style={{ color: "var(--text-dark)" }}
            >
              <span>View All</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Collection list — editorial row style */}
        <div
          className="flex flex-col border-t"
          style={{ borderColor: "rgba(184,149,106,0.1)" }}
        >
          {collections.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link href={col.href}>
                <div
                  className="group flex items-center justify-between py-6 border-b cursor-pointer transition-all duration-400"
                  style={{
                    borderColor: "rgba(184,149,106,0.1)",
                  }}
                >
                  {/* Left */}
                  <div className="flex items-center gap-4 md:gap-8">
                    <span
                      className="font-inter text-[11px] w-8 shrink-0"
                      style={{ color: "var(--text-light)" }}
                    >
                      {col.index}
                    </span>
                    <div>
                      <h3
                        className="font-playfair text-2xl md:text-4xl transition-colors duration-300 group-hover:text-[var(--gold)]"
                        style={{ color: "var(--text-dark)", letterSpacing: "-0.01em" }}
                      >
                        {col.name}
                      </h3>
                      <p
                        className="font-inter text-[10px] tracking-[0.2em] uppercase mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ color: "var(--gold)" }}
                      >
                        {col.tagline}
                      </p>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="flex items-center gap-6">
                    <p
                      className="hidden md:block font-inter text-sm max-w-[260px] text-right"
                      style={{ color: "var(--text-light)" }}
                    >
                      {col.description}
                    </p>
                    <span
                      className="font-inter text-lg transition-transform duration-300 group-hover:translate-x-2"
                      style={{ color: "var(--gold)" }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}