"use client";

import { motion } from "framer-motion";
import Link from "next/link";


export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Large decorative background index number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-playfair leading-none"
          style={{
            fontSize: "clamp(180px, 30vw, 420px)",
            color: "rgba(155,99,53,0.05)",
            fontStyle: "italic",
            letterSpacing: "-0.04em",
          }}
        >
          W
        </span>
      </div>

      {/* Top thin line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(184,149,106,0.1)" }}
      />

      {/* Vertical label — left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-3"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        <span
          className="font-inter text-[9px] tracking-[0.4em] uppercase"
          style={{ color: "var(--text-light)" }}
        >
          Premium Women&apos;s Fashion
        </span>
        <span
          className="w-12 h-px"
          style={{ background: "rgba(184,149,106,0.3)", display: "inline-block" }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-16 md:pb-24 pt-24 md:pt-40 w-full">

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair leading-none mb-8"
          style={{
            fontSize: "clamp(56px, 9vw, 148px)",
            color: "var(--text-dark)",
            letterSpacing: "-0.02em",
          }}
        >
          Fashion
          <br />
          <em
            style={{
              color: "var(--gold)",
              fontStyle: "italic",
              fontSize: "0.85em",
              letterSpacing: "-0.01em",
            }}
          >
            Specialists
          </em>
        </motion.h1>

        {/* Sub-grid row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10 border-t pt-8 md:pt-10"
          style={{ borderColor: "rgba(184,149,106,0.12)" }}
        >
          <p
            className="font-inter text-sm leading-8 max-w-sm"
            style={{ color: "var(--text-light)" }}
          >
            Shop our curated kaftans, cord sets, salwars, frocks and more
            online — or catch us live on Facebook for an intimate,
            real-time styling experience.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 shrink-0">
            <Link
              href="/shop"
              className="px-6 py-3 font-inter text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
              style={{ background: "var(--gold)", color: "#fff" }}
            >
              Shop Now →
            </Link>
            <Link
              href="/collections"
              className="group font-inter text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 transition-opacity duration-300 hover:opacity-60"
              style={{ color: "var(--text-dark)" }}
            >
              <span>Explore Collections</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 border-t"
        style={{ borderColor: "rgba(155,99,53,0.1)", background: "rgba(155,99,53,0.04)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3">
              {[
              { label: "Shop Online", value: "New" },
              { label: "Live Sales Hosted", value: "50+" },
              { label: "Pieces Curated", value: "200+" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="py-4 md:py-6 px-3 md:px-6 first:pl-0"
                style={{ borderRight: i < 2 ? "1px solid rgba(184,149,106,0.12)" : "none" }}
              >
                <p
                  className="font-playfair text-2xl mb-1"
                  style={{ color: "var(--gold)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-inter text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--text-light)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute right-8 bottom-28 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }}
        />
        <span
          className="font-inter text-[8px] tracking-[0.4em] uppercase"
          style={{ color: "var(--text-light)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
