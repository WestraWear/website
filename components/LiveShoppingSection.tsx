"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sessions = [
  { day: "Monday", time: "7:00 PM – 9:00 PM", theme: "Saree Spotlight" },
  { day: "Wednesday", time: "8:00 PM – 10:00 PM", theme: "Kurti & Ethnic Wear" },
  { day: "Friday", time: "7:30 PM – 10:00 PM", theme: "Party & Festival Specials" },
  { day: "Sunday", time: "6:00 PM – 9:00 PM", theme: "New Arrivals & Flash Deals" },
];

export default function LiveShoppingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-section)", paddingTop: 0 }}
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
            </div>
            <h2
              className="font-playfair leading-tight"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              Shop With Us
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Live</em>
            </h2>
          </div>
          <p
            className="font-inter text-sm leading-7 max-w-xs"
            style={{ color: "var(--text-light)" }}
          >
            Experience the joy of curated fashion in real-time. Explore, ask
            questions, and choose pieces crafted just for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Session schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p
              className="font-inter text-[9px] tracking-[0.4em] uppercase mb-8"
              style={{ color: "var(--text-light)" }}
            >
              Weekly Schedule
            </p>
            <div
              className="flex flex-col border-t"
              style={{ borderColor: "rgba(184,149,106,0.1)" }}
            >
              {sessions.map((s, i) => (
                <motion.div
                  key={s.day}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  className="flex items-center justify-between py-6 border-b"
                  style={{ borderColor: "rgba(184,149,106,0.1)" }}
                >
                  <div>
                    <p
                      className="font-playfair text-xl mb-1"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {s.day}
                    </p>
                    <p
                      className="font-inter text-[10px] tracking-[0.15em] uppercase"
                      style={{ color: "var(--gold)" }}
                    >
                      {s.theme}
                    </p>
                  </div>
                  <p
                    className="font-inter text-xs"
                    style={{ color: "var(--text-light)" }}
                  >
                    {s.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Live indicator */}
            <div
              className="p-8 flex flex-col gap-6"
              style={{ border: "1px solid rgba(184,149,106,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#E05252" }}
                />
                <span
                  className="font-inter text-[10px] tracking-[0.35em] uppercase"
                  style={{ color: "var(--text-mid)" }}
                >
                  Broadcasting Live
                </span>
              </div>
              <p
                className="font-playfair text-3xl leading-snug"
                style={{ color: "var(--text-dark)", fontStyle: "italic" }}
              >
                &ldquo;Join us live and discover your next favourite piece.&rdquo;
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.facebook.com/share/1BWf44pd5s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:opacity-70"
                  style={{ border: "1px solid rgba(184,149,106,0.2)", color: "var(--champagne)" }}
                >
                  <span className="font-inter text-[10px] tracking-[0.25em] uppercase">
                    Watch on Facebook
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-sm">
                    →
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/westra_wear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-5 py-4 transition-all duration-300 hover:opacity-70"
                  style={{
                    background: "rgba(184,149,106,0.08)",
                    color: "var(--gold)",
                  }}
                >
                  <span className="font-inter text-[10px] tracking-[0.25em] uppercase">
                    Shop on Instagram
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-sm">
                    →
                  </span>
                </a>
              </div>
            </div>

            <p
              className="font-inter text-sm leading-7"
              style={{ color: "var(--text-light)" }}
            >
              Can&apos;t join live? Browse past collections anytime on our
              Instagram gallery, or message us on WhatsApp for personalised
              styling assistance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}