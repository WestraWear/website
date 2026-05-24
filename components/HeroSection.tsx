"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";


export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://scontent.fccu10-1.fna.fbcdn.net/v/t39.30808-6/700079005_122108593898695822_2803132509224644353_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Nsu01m3BLPUQ7kNvwGBGJPl&_nc_oc=Adq5YLOe9mkR0v9J1OPt49D7L7noI2psRebcEFqSmb4ukY8Eb_CYFgiR-1zqL2-Btrw&_nc_zt=23&_nc_ht=scontent.fccu10-1.fna&_nc_gid=OxeTO7_3-BEfXcyA2qEt1w&_nc_ss=7b2a8&oh=00_Af7JWvWuMYdYI6VftOhnEbgbCvz5912v8A3jN8dy1c_TMA&oe=6A182D81')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y: bgY,
          scale: 1.15,
        }}
      />
      {/* Background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(20,14,10,0.55)" }}
      />
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
          style={{ color: "rgba(255,255,255,0.5)" }}
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
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Fashion
          <br />
          <em
            style={{
              color: "#E8C49A",
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
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          <p
            className="font-inter text-sm leading-8 max-w-sm"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Shop our curated kaftans, co-ord sets, salwars, frocks and more
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
              style={{ color: "#fff" }}
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
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.25)" }}
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
                style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
              >
                <p
                  className="font-playfair text-2xl mb-1"
                  style={{ color: "#E8C49A" }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-inter text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(255,255,255,0.6)" }}
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
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
