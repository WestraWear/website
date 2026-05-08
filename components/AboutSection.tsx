"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-section)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8" ref={ref}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left — large headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-playfair leading-tight mb-10"
              style={{
                fontSize: "clamp(40px, 5vw, 80px)",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              Crafted for the
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                Woman Who Inspires
              </em>
            </h2>

            {/* Stats row */}
            <div
              className="grid grid-cols-3 border-t border-b py-8 gap-6"
              style={{ borderColor: "rgba(184,149,106,0.12)" }}
            >
              {[
                { v: "New", l: "Launched" },
                { v: "2k+", l: "Customers" },
                { v: "500+", l: "Pieces" },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    className="font-playfair text-3xl mb-1"
                    style={{ color: "var(--gold)" }}
                  >
                    {s.v}
                  </p>
                  <p
                    className="font-inter text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--text-light)" }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10"
            >
              <Link
                href="/about"
                className="group font-inter text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 transition-opacity duration-300 hover:opacity-60"
                style={{ color: "var(--text-dark)" }}
              >
                <span>Our Full Story</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex flex-col gap-8 pt-2"
          >
            <blockquote
              className="font-playfair text-2xl md:text-3xl leading-relaxed"
              style={{
                color: "var(--champagne)",
                fontStyle: "italic",
                borderLeft: "2px solid var(--gold)",
                paddingLeft: "24px",
              }}
            >
              &ldquo;Every woman deserves to feel exquisite, every single day.&rdquo;
            </blockquote>

            <p
              className="font-inter text-sm leading-8"
              style={{ color: "var(--text-light)" }}
            >
              We began as a curated boutique driven by a passion for celebrating
              femininity through fashion. From the delicate threadwork of a Banarasi
              saree to the modern cut of a fusion kurti — every piece in our
              collection tells a story of craftsmanship, culture, and confidence.
            </p>

            <p
              className="font-inter text-sm leading-8"
              style={{ color: "var(--text-light)" }}
            >
              Today, we bring that same curation to your screens — live, personal,
              and intimate — through our Facebook Live sessions and Instagram,
              creating a shopping experience as refined as our collections.
            </p>

            {/* Pillars */}
            <div
              className="grid grid-cols-1 gap-0 mt-4 border-t"
              style={{ borderColor: "rgba(184,149,106,0.12)" }}
            >
              {["Craftsmanship", "Authenticity", "Personal Curation"].map(
                (val, i) => (
                  <div
                    key={val}
                    className="flex items-center justify-between py-5 border-b"
                    style={{ borderColor: "rgba(184,149,106,0.1)" }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-inter text-[10px]"
                        style={{ color: "var(--text-light)" }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="font-inter text-xs tracking-[0.2em] uppercase"
                        style={{ color: "var(--champagne)" }}
                      >
                        {val}
                      </span>
                    </div>
                    <span style={{ color: "var(--text-light)", fontSize: "12px" }}>→</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
