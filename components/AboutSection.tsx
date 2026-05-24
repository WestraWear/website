"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const BG_IMAGE = "url('https://scontent.fccu10-1.fna.fbcdn.net/v/t39.30808-6/701437120_122108589656695822_5264143355649113064_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=iv0yI-JecdAQ7kNvwF70VoI&_nc_oc=AdoErNbS8Ew9M7BjZSqiV2VRafyXktXyFoA1E18qP8cKnCD6Bg5auF1zXtGpks08wpY&_nc_zt=23&_nc_ht=scontent.fccu10-1.fna&_nc_gid=SQ8dpe0s_gebKKLNi233tg&_nc_ss=7b2a8&oh=00_Af45lAKxnVop7i7Z3lt6iVgiAb2Lxjq3s_BZnS9ULrwyxQ&oe=6A180453')";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: BG_IMAGE,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          y: bgY,
          scale: 1.15,
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(18,12,8,0.68)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8" ref={contentRef}>

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
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Crafted for the
              <br />
              <em style={{ color: "#E8C49A", fontStyle: "italic" }}>
                Woman Who Inspires
              </em>
            </h2>

            {/* Stats row */}
            <div
              className="grid grid-cols-2 border-t border-b py-8 gap-6"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {[
                { v: "New", l: "Launched" },
                { v: "500+", l: "Pieces" },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    className="font-playfair text-3xl mb-1"
                    style={{ color: "#E8C49A" }}
                  >
                    {s.v}
                  </p>
                  <p
                    className="font-inter text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(255,255,255,0.5)" }}
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
                style={{ color: "rgba(255,255,255,0.9)" }}
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
                color: "rgba(255,255,255,0.9)",
                fontStyle: "italic",
                borderLeft: "2px solid #E8C49A",
                paddingLeft: "24px",
              }}
            >
              &ldquo;Every woman deserves to feel exquisite, every single day.&rdquo;
            </blockquote>

            <p
              className="font-inter text-sm leading-8"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              We began as a curated boutique driven by a passion for celebrating
              femininity through fashion. From a flowing kaftan to a perfectly
              tailored co-ord set — every piece in our collection tells a story of
              craftsmanship, culture, and confidence.
            </p>

            <p
              className="font-inter text-sm leading-8"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Today you can shop our full catalogue online or experience the
              warmth of our Facebook Live sessions — where Sweta styles each
              piece personally and helps you find exactly what&apos;s right for you.
            </p>

            {/* Pillars */}
            <div
              className="grid grid-cols-1 gap-0 mt-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {["Craftsmanship", "Online Shop", "Live Styling"].map(
                (val, i) => (
                  <div
                    key={val}
                    className="flex items-center justify-between py-5 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-inter text-[10px]"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="font-inter text-xs tracking-[0.2em] uppercase"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {val}
                      </span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>→</span>
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