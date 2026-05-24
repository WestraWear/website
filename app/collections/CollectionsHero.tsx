"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CollectionsHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={heroRef} className="relative min-h-[100vh] flex items-end overflow-hidden pt-24">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://scontent.fccu10-1.fna.fbcdn.net/v/t39.30808-6/701260434_122108588720695822_2319626675885099207_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zxfTiD2oEwUQ7kNvwEOFIcd&_nc_oc=Ado6yTFxZ2wP02ghdm7Ll0-dyJjHwp999XemK0lnrNzDEcQWiDIJsxxl_6C5xrGby5g&_nc_zt=23&_nc_ht=scontent.fccu10-1.fna&_nc_gid=mekGE3R94dpW3xIEtUE0DA&_nc_ss=7b2a8&oh=00_Af5HEG63fms-CTNu2Dav97_DGuCMeEpkAb4UMcnhD_v0BQ&oe=6A18282E')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          y: bgY,
          scale: 1.15,
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(18,12,8,0.60)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="w-8 h-px" style={{ background: "#E8C49A" }} />
          <span className="font-inter text-[9px] tracking-[0.5em] uppercase" style={{ color: "#E8C49A" }}>
            Westra Fashion House
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-playfair leading-[0.9] mb-8"
          style={{ fontSize: "clamp(56px, 9vw, 140px)", color: "#fff", letterSpacing: "-0.02em" }}
        >
          Our<br /><em style={{ color: "#E8C49A" }}>Collections</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-cormorant text-2xl italic max-w-xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          A curated universe of women&apos;s fashion, crafted to celebrate every
          facet of your unique beauty.
        </motion.p>
      </div>
    </section>
  );
}
