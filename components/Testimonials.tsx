"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    review:
      "Westra's live sessions are unlike anything else. I found my favourite saree during a Friday live and the quality exceeded every expectation. Truly a luxury experience.",
    piece: "Kanjivaram Saree",
    index: "01",
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    review:
      "I ordered through WhatsApp and was amazed by the personalised service. They helped me pick the perfect fusion kurti for my friend's wedding. Simply outstanding.",
    piece: "Fusion Kurti Set",
    index: "02",
  },
  {
    name: "Meera Nair",
    location: "Kochi",
    review:
      "The party collection is breathtaking. I wore a Westra lehenga to Diwali and received compliments all evening. The craftsmanship is extraordinary.",
    piece: "Festive Lehenga",
    index: "03",
  },
  {
    name: "Divya Krishnan",
    location: "Chennai",
    review:
      "What I love most is the curation — every piece feels handpicked with love. The Instagram shopping experience is seamless and so personal.",
    piece: "Ethnic Co-ord Set",
    index: "04",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="font-inter text-[9px] tracking-[0.5em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                Client Stories
              </span>
            </div>
            <h2
              className="font-playfair leading-tight"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              Words from Our
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                Lovely Customers
              </em>
            </h2>
          </div>
          <p
            className="font-inter text-sm leading-7 max-w-xs"
            style={{ color: "var(--text-light)" }}
          >
            Unrivaled personal service, curated design and exceptional quality.
            Our customers keep coming back.
          </p>
        </motion.div>

        {/* Testimonials — editorial list */}
        <div
          className="flex flex-col border-t"
          style={{ borderColor: "rgba(184,149,106,0.1)" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group py-10 border-b"
              style={{ borderColor: "rgba(184,149,106,0.1)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_200px] gap-6 md:gap-12 items-start">
                {/* Index */}
                <span
                  className="font-inter text-[11px]"
                  style={{ color: "var(--text-light)" }}
                >
                  {t.index}
                </span>

                {/* Quote */}
                <div>
                  <p
                    className="font-playfair text-xl md:text-2xl leading-relaxed mb-6"
                    style={{
                      color: "var(--champagne)",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-6 h-px"
                      style={{ background: "var(--gold)" }}
                    />
                    <p
                      className="font-inter text-sm"
                      style={{ color: "var(--text-mid)" }}
                    >
                      {t.name}
                    </p>
                    <span style={{ color: "var(--text-light)", fontSize: "12px" }}>—</span>
                    <p
                      className="font-inter text-xs"
                      style={{ color: "var(--text-light)" }}
                    >
                      {t.location}
                    </p>
                  </div>
                </div>

                {/* Piece tag */}
                <div className="md:text-right">
                  <span
                    className="inline-block font-inter text-[10px] tracking-[0.2em] uppercase px-4 py-2"
                    style={{
                      border: "1px solid rgba(184,149,106,0.2)",
                      color: "var(--gold)",
                    }}
                  >
                    {t.piece}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
