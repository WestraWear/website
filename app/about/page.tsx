"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WhatsAppCTA from "@/components/WhatsAppCTA";

const values = [
  {
    index: "01",
    title: "Craftsmanship",
    description:
      "Every piece in our collection is chosen for the quality of its weave, embroidery, or construction. We work closely with artisans and weavers who carry forward generations of skill.",
  },
  {
    index: "02",
    title: "Elegance",
    description:
      "We believe elegance is not a size or a shape — it's a feeling. Our curation is designed to make every woman feel like her most radiant self.",
  },
  {
    index: "03",
    title: "Authenticity",
    description:
      "No shortcuts. Our pieces are sourced from trusted craftspeople across India. What you see is exactly what you receive — beautiful, authentic, and worth every moment.",
  },
  {
    index: "04",
    title: "Community",
    description:
      "Our customers are our community. The Facebook Live sessions aren't just about selling — they're about conversations, styling advice, and celebrating fashion together.",
  },
];

const stats = [
  { value: "New", label: "Fresh Drop Every Week" },
  { value: "10+", label: "Artisan Partners" },
  { value: "200+", label: "Pieces Curated" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-end overflow-hidden pt-24"
        style={{ background: "var(--bg-section)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(var(--gold) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute right-0 bottom-0 select-none pointer-events-none leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(200px, 28vw, 400px)",
            color: "rgba(155,99,53,0.04)",
            fontStyle: "italic",
            lineHeight: 1,
          }}
        >
          W
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
            <span
              className="font-inter text-[9px] tracking-[0.5em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Est. 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-playfair leading-[0.9] mb-8"
            style={{
              fontSize: "clamp(56px, 9vw, 140px)",
              color: "var(--text-dark)",
              letterSpacing: "-0.02em",
            }}
          >
            Our
            <br />
            <em style={{ color: "var(--gold)" }}>Story</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-2xl md:text-3xl italic max-w-2xl leading-relaxed"
            style={{ color: "var(--text-mid)" }}
          >
            Born from a belief that every woman deserves to inhabit her beauty —
            every single day.
          </motion.p>
        </div>
      </section>

      {/* ── Manifesto ────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 flex flex-col gap-4 lg:pt-2"
            >
              <span
                className="font-inter text-[9px] tracking-[0.5em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                Who We Are
              </span>
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="lg:col-span-9 flex flex-col gap-8"
            >
              <h2
                className="font-playfair leading-tight"
                style={{
                  fontSize: "clamp(32px, 4vw, 60px)",
                  color: "var(--text-dark)",
                  letterSpacing: "-0.02em",
                }}
              >
                We started Westra because fashion should be{" "}
                <em style={{ color: "var(--gold)" }}>experienced</em> —
                not just purchased.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>
                  Our live selling model on Facebook and Instagram is intentional.
                  Fashion should be seen in movement, discussed with passion, and
                  chosen with the guidance of someone who genuinely loves what they
                  curate.
                </p>
                <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>
                  Behind every saree, every kurti, every ethnic ensemble at Westra is a
                  story of artisan hands, regional traditions, and our relentless pursuit
                  of beauty. We are honoured to bring these stories to your wardrobe.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────── */}
      <div
        className="border-y"
        style={{ borderColor: "rgba(155,99,53,0.12)", background: "rgba(155,99,53,0.03)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="py-6 md:py-10 px-4 md:px-8 flex flex-col gap-1 border-r last:border-r-0"
                style={{ borderColor: "rgba(155,99,53,0.1)" }}
              >
                <span className="font-playfair text-4xl" style={{ color: "var(--text-dark)" }}>
                  {s.value}
                </span>
                <span
                  className="font-inter text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "var(--text-light)" }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Founder ──────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              {/* Decorative frame offset */}
              <div
                className="absolute -top-4 -left-4 w-full h-full"
                style={{ border: "1px solid rgba(184,149,106,0.2)" }}
              />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://cdn.westra.in/founder.png"
                  alt="Sweta Nath — Founder of Westra Wear"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
                {/* Subtle gradient vignette at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(40,32,26,0.3), transparent)",
                  }}
                />
              </div>
              {/* Floating name tag */}
              <div
                className="absolute bottom-6 left-6 right-6 flex items-end justify-between"
              >
                <div>
                  <p
                    className="font-playfair text-2xl italic"
                    style={{ color: "#fff", letterSpacing: "-0.01em" }}
                  >
                    Sweta Nath
                  </p>
                  <p
                    className="font-inter text-[9px] tracking-[0.35em] uppercase mt-0.5"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    Founder &amp; Creative Director
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col gap-8"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span
                  className="font-inter text-[9px] tracking-[0.5em] uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  The Woman Behind Westra
                </span>
              </div>

              <h2
                className="font-playfair leading-tight"
                style={{
                  fontSize: "clamp(36px, 4.5vw, 68px)",
                  color: "var(--text-dark)",
                  letterSpacing: "-0.02em",
                }}
              >
                Fashion isn&apos;t just what
                <br />
                you wear —{" "}
                <em style={{ color: "var(--gold)" }}>it&apos;s how you
                <br />choose to be seen.</em>
              </h2>

              <div className="flex flex-col gap-5">
                <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>
                  Sweta Nath founded Westra at 25 with a single conviction: that
                  women deserve a fashion experience built on trust, taste, and
                  genuine care — not just transactions. Growing up with a love for
                  textiles and a sharp eye for silhouettes, she turned a passion
                  into a living, breathing brand.
                </p>
                <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>
                  Every piece at Westra passes through Sweta&apos;s hands first.
                  She sources directly, styles personally, and shows everything live
                  — because she believes you should see a garment move before you
                  decide it&apos;s yours. That intimacy is not a feature; it&apos;s
                  the whole philosophy.
                </p>
              </div>

              {/* Pull-quote */}
              <blockquote
                className="border-l-2 pl-6 py-1"
                style={{ borderColor: "var(--gold)" }}
              >
                <p
                  className="font-cormorant text-xl md:text-2xl italic leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  &ldquo;When a woman walks in feeling unsure and leaves glowing —
                  that&apos;s the whole point.&rdquo;
                </p>
                <cite
                  className="block font-inter text-[10px] tracking-[0.3em] uppercase mt-3 not-italic"
                  style={{ color: "var(--gold)" }}
                >
                  — Sweta Nath
                </cite>
              </blockquote>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-16"
          >
            <p
              className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4"
              style={{ color: "var(--gold)" }}
            >
              What We Stand For
            </p>
            <h2
              className="font-playfair text-5xl md:text-6xl"
              style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}
            >
              Our Values
            </h2>
          </motion.div>

          <div className="flex flex-col">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group grid grid-cols-12 gap-8 py-10 border-t items-start cursor-default"
                style={{ borderColor: "rgba(155,99,53,0.12)" }}
              >
                <div className="col-span-1">
                  <span className="font-inter text-xs" style={{ color: "var(--text-light)" }}>
                    {v.index}
                  </span>
                </div>
                <div className="col-span-11 md:col-span-4">
                  <h3
                    className="font-playfair text-2xl md:text-3xl group-hover:text-[var(--gold)] transition-colors duration-300"
                    style={{ color: "var(--text-dark)" }}
                  >
                    {v.title}
                  </h3>
                </div>
                <div className="col-span-11 md:col-span-7 md:col-start-6">
                  <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>
                    {v.description}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="border-t" style={{ borderColor: "rgba(155,99,53,0.12)" }} />
          </div>
        </div>
      </section>

      <WhatsAppCTA />
    </div>
  );
}
