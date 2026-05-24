"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={heroRef} className="relative min-h-[100vh] flex items-end overflow-hidden pt-24">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://scontent.fccu10-1.fna.fbcdn.net/v/t39.30808-6/701216904_122108592458695822_6133797794572917294_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=0KY5Y3aWs8UQ7kNvwGN-UZ5&_nc_oc=AdrXnpkwqyoJDuSMlHIkQX0Uu-YyEWILfsoJjLkeRWlpbxWwdBbaDn_P8iaLMqABeBk&_nc_zt=23&_nc_ht=scontent.fccu10-1.fna&_nc_gid=KlUY55fAxQ8cg8Auy5jtjA&_nc_ss=7b2a8&oh=00_Af5a6Pn9U6Yzg_5EtlKLuSZMt2eQfRd8gmhQUWThhPxnug&oe=6A180DDD')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
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
            Est. 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-playfair leading-[0.9] mb-8"
          style={{ fontSize: "clamp(56px, 9vw, 140px)", color: "#fff", letterSpacing: "-0.02em" }}
        >
          Our<br /><em style={{ color: "#E8C49A" }}>Story</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-cormorant text-2xl md:text-3xl italic max-w-2xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Born from a belief that every woman deserves to inhabit her beauty —
          every single day.
        </motion.p>
      </div>
    </section>
  );
}
