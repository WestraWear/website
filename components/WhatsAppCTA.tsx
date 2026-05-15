"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Top/bottom thin lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(184,149,106,0.1)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >

            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="font-inter text-[9px] tracking-[0.5em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                Shop & Connect
              </span>
            </div>
            <h2
              className="font-playfair leading-tight mb-6"
              style={{
                fontSize: "clamp(40px, 5vw, 80px)",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              Your Style,
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                Our Expertise
              </em>
            </h2>
            <p
              className="font-inter text-sm leading-8 max-w-md"
              style={{ color: "var(--text-light)" }}
            >
              Browse our full collection online anytime. Prefer a personal touch?
              Message us on WhatsApp for styling help, custom size queries,
              or anything not yet listed in the shop.
            </p>
          </motion.div>

          {/* Right — action panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <a
              href="https://wa.me/917501182583"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-8 py-6 transition-all duration-300 hover:opacity-80"
              style={{
                border: "1px solid rgba(184,149,106,0.3)",
                color: "var(--text-dark)",
              }}
            >
              <div>
                <p className="font-inter text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--gold)" }}>
                  WhatsApp
                </p>
                <p className="font-playfair text-xl" style={{ color: "var(--text-dark)" }}>
                  Chat With Us Now
                </p>
              </div>
              <FaWhatsapp size={22} style={{ color: "var(--gold)" }} />
            </a>

            <a
              href="https://www.instagram.com/westra_wear"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-8 py-6 transition-all duration-300 hover:opacity-80"
              style={{
                border: "1px solid rgba(184,149,106,0.15)",
                color: "var(--text-dark)",
              }}
            >
              <div>
                <p className="font-inter text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--text-light)" }}>
                  Instagram
                </p>
                <p className="font-playfair text-xl" style={{ color: "var(--champagne)" }}>
                  Browse Our Gallery
                </p>
              </div>
              <span
                className="font-inter text-2xl transition-transform duration-300 group-hover:translate-x-2"
                style={{ color: "var(--text-light)" }}
              >
                →
              </span>
            </a>

            <p
              className="font-inter text-xs mt-2"
              style={{ color: "var(--text-light)" }}
            >
              Response time: within 2 hours · Mon–Sun, 10 AM – 9 PM
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}