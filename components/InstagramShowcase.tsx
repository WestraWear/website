"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

interface IGPost {
  id: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

// Fallback placeholders used when the API is not yet connected
const FALLBACK_POSTS = [
  { id: "1", label: "Co-ord Set Edit",    tag: "#WestraCordSet",  likes: "2.4k" },
  { id: "2", label: "Kaftan Collection", tag: "#WestraKaftan",   likes: "1.8k" },
  { id: "3", label: "Salwar Showcase",   tag: "#WestraSalwar",   likes: "3.1k" },
  { id: "4", label: "Two Piece Looks",   tag: "#WestraTwoPiece", likes: "2.9k" },
  { id: "5", label: "Tops & Shirts",     tag: "#WestraTops",     likes: "1.5k" },
  { id: "6", label: "Frock Diaries",     tag: "#WestraFrocks",   likes: "2.2k" },
];

export default function InstagramShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [posts, setPosts] = useState<IGPost[]>([]);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    fetch(`${BASE}/social/instagram/feed?limit=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: IGPost[]) => {
        if (data.length > 0) setPosts(data);
        else setUseFallback(true);
      })
      .catch(() => setUseFallback(true));
  }, []);

  const showFallback = useFallback || posts.length === 0;


  return (
    <section className="section-padding" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <h2
              className="font-playfair leading-tight"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              Our
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Instagram</em>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/westra_wear"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-inter text-[10px] tracking-[0.3em] uppercase transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--text-dark)" }}
          >
            <span>Follow Us</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {showFallback
            ? FALLBACK_POSTS.map((post, i) => (
                <motion.a
                  key={post.id}
                  href="https://www.instagram.com/westra_wear"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative overflow-hidden cursor-pointer aspect-square"
                  style={{ background: "var(--bg-card)" }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: "radial-gradient(rgba(184,149,106,1) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
                    <span
                      className="font-playfair text-4xl opacity-10"
                      style={{ color: "var(--gold)", fontStyle: "italic" }}
                    >
                      W
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400"
                    style={{ background: "rgba(12,10,8,0.85)" }}
                  >
                    <p className="font-inter text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--gold)" }}>
                      {post.tag}
                    </p>
                    <p className="font-playfair text-lg" style={{ color: "var(--text-dark)", fontStyle: "italic" }}>
                      {post.label}
                    </p>
                    <p className="font-inter text-[10px] mt-1" style={{ color: "var(--text-light)" }}>
                      ♥ {post.likes} likes
                    </p>
                  </div>
                  <div
                    className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                    style={{ background: "var(--gold)" }}
                  />
                </motion.a>
              ))
            : posts.map((post, i) => {
                const imgSrc = post.thumbnail_url ?? post.media_url ?? "";
                return (
                  <motion.a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group relative overflow-hidden cursor-pointer aspect-square"
                    style={{ background: "var(--bg-card)" }}
                  >
                    {imgSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imgSrc}
                        alt={post.caption?.slice(0, 60) ?? "Instagram post"}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div
                      className="absolute inset-0 flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400"
                      style={{ background: "rgba(12,10,8,0.75)" }}
                    >
                      {post.caption && (
                        <p className="font-inter text-xs leading-relaxed line-clamp-3" style={{ color: "var(--text-dark)" }}>
                          {post.caption}
                        </p>
                      )}
                      <p className="font-inter text-[10px] mt-2 opacity-60" style={{ color: "var(--text-light)" }}>
                        {new Date(post.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                      style={{ background: "var(--gold)" }}
                    />
                  </motion.a>
                );
              })}
        </div>
      </div>
    </section>
  );
}
