"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaInstagram, FaPlay, FaArrowRight, FaHeart, FaComment } from "react-icons/fa";
import { api, type InstagramPost } from "@/lib/api";

const SIZE_PATTERN: Array<"large" | "medium" | "small"> = [
  "large", "small", "small", "medium", "large", "small", "medium", "small", "large",
];

type IgStats = { followers_count: number | null; media_count: number | null; username: string | null };

function fmtCount(n: number | null | undefined): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
  return String(n);
}

const GRADIENTS = [
  "linear-gradient(145deg,#F0EAE0,#E8E0D4)", "linear-gradient(145deg,#EDE4D8,#E4DDD5)",
  "linear-gradient(145deg,#F4EFE8,#EBE3D9)", "linear-gradient(145deg,#E8E2DA,#DDD6CC)",
  "linear-gradient(145deg,#F2EDE5,#E9E1D6)", "linear-gradient(145deg,#EDE8E1,#E3DBD0)",
  "linear-gradient(145deg,#F0EBE2,#E6DDD2)", "linear-gradient(145deg,#EAE4DC,#E1D9CE)",
  "linear-gradient(145deg,#F3EDE5,#ECE4D8)",
];

function aspectRatio(size: "large" | "medium" | "small") {
  if (size === "large") return "3/4";
  if (size === "medium") return "1/1";
  return "4/5";
}

function shortCaption(caption?: string) {
  if (!caption) return "";
  const first = caption.split("\n")[0];
  return first.length > 52 ? first.slice(0, 52) + "…" : first;
}

export default function InstagramGallery({ initialPosts, initialReels, initialStats }: {
  initialPosts?: InstagramPost[];
  initialReels?: InstagramPost[];
  initialStats?: IgStats | null;
}) {
  const [posts,   setPosts]   = useState<InstagramPost[]>(initialPosts ?? []);
  const [reels,   setReels]   = useState<InstagramPost[]>(initialReels ?? []);
  const [stats,   setStats]   = useState<IgStats | null>(initialStats ?? null);
  const [loading, setLoading] = useState(!initialPosts);
  const [error,   setError]   = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (initialPosts) return;
    Promise.all([
      api.social.instagramFeed(24),
      api.social.instagramStats().catch(() => null),
    ])
      .then(([items, igStats]) => {
        setPosts(items.filter((m) => m.media_type !== "VIDEO"));
        setReels(items.filter((m) => m.media_type === "VIDEO"));
        setStats(igStats);
      })
      .catch((err: Error) => setError(err.message.includes("503") ? "not_configured" : err.message))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('https://cdn.westra.in/instagram_gallery_hero.jpg')",
            backgroundSize: "cover", backgroundPosition: "center 10%", backgroundRepeat: "no-repeat",
            y: bgY, scale: 1.15,
          }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(18,12,8,0.60)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 pt-28 md:pt-40 w-full">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-inter text-[9px] tracking-[0.5em] uppercase mb-6 flex items-center gap-3" style={{ color: "#E8C49A" }}>
            <FaInstagram size={10} />
            <span className="w-8 h-px inline-block" style={{ background: "#E8C49A" }} />
            @westra_wear
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-playfair leading-[0.9]" style={{ fontSize: "clamp(56px,10vw,140px)", color: "#fff", letterSpacing: "-0.02em" }}>
            Style<br /><em style={{ color: "#E8C49A" }}>Gallery</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="font-cormorant text-xl md:text-2xl italic mt-6 max-w-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
            Every post is a window into a wardrobe carefully curated for you.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-alt)", borderTop: "1px solid rgba(155,99,53,0.1)", borderBottom: "1px solid rgba(155,99,53,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-3">
          {([
            { value: fmtCount(stats?.followers_count), label: "Followers" },
            { value: fmtCount(stats?.media_count),     label: "Posts" },
            { value: stats?.username ? `@${stats.username}` : "@westra_wear", label: "Handle" },
          ] as { value: string; label: string }[]).map((s, i) => (
            <div key={s.label} className="flex flex-col items-center py-4 gap-1 border-r last:border-r-0" style={{ borderColor: "rgba(155,99,53,0.1)" }}>
              <span className="font-playfair text-3xl md:text-4xl" style={{ color: "var(--gold)" }}>{s.value}</span>
              <span className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "var(--gold)" }}>Latest Posts</p>
              <h2 className="font-playfair text-4xl md:text-5xl" style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}>Recent Looks</h2>
            </div>
            <a href="https://www.instagram.com/westra_wear" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 font-inter text-[10px] tracking-[0.25em] uppercase"
              style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-mid)" }}>
              <FaInstagram size={11} /> View Profile <FaArrowRight size={10} />
            </a>
          </div>

          {loading && (
            <div className="columns-2 md:columns-3 gap-4">
              {SIZE_PATTERN.map((size, i) => (
                <div key={i} className="mb-4 break-inside-avoid animate-pulse rounded-sm" style={{ aspectRatio: aspectRatio(size), background: GRADIENTS[i % GRADIENTS.length] }} />
              ))}
            </div>
          )}

          {!loading && error === "not_configured" && (
            <div className="flex flex-col items-center py-20 gap-4 text-center">
              <FaInstagram size={32} style={{ color: "var(--gold)", opacity: 0.4 }} />
              <p className="font-cormorant text-xl italic" style={{ color: "var(--text-mid)" }}>Instagram is not yet connected.</p>
            </div>
          )}

          {!loading && error && error !== "not_configured" && (
            <p className="text-center font-inter text-sm py-16" style={{ color: "var(--text-light)" }}>Could not load posts. Please try again later.</p>
          )}

          {!loading && !error && (
            <div className="columns-2 md:columns-3 gap-4">
              {posts.map((post, i) => {
                const size = SIZE_PATTERN[i % SIZE_PATTERN.length];
                const imgSrc = post.media_url ?? post.thumbnail_url;
                return (
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer" key={post.id}
                    className="group relative mb-4 overflow-hidden cursor-pointer break-inside-avoid block"
                    style={{ background: GRADIENTS[i % GRADIENTS.length], aspectRatio: aspectRatio(size) }}>
                    {imgSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imgSrc} alt={shortCaption(post.caption) || "Instagram post"}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top,rgba(40,32,26,0.78) 0%,transparent 60%)" }}>
                      {post.caption && <p className="font-playfair text-white text-sm leading-snug mb-2 line-clamp-2">{shortCaption(post.caption)}</p>}
                      <div className="flex gap-4">
                        {post.like_count !== undefined && <span className="flex items-center gap-1.5 font-inter text-[10px] text-white/80"><FaHeart size={10} /> {post.like_count.toLocaleString()}</span>}
                        {post.comments_count !== undefined && <span className="flex items-center gap-1.5 font-inter text-[10px] text-white/80"><FaComment size={10} /> {post.comments_count.toLocaleString()}</span>}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Reels */}
      <section className="section-padding" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-14">
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "var(--gold)" }}>Video</p>
            <h2 className="font-playfair text-4xl md:text-5xl" style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}>Reels &amp; Lookbooks</h2>
          </div>

          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0,1,2,3].map((i) => <div key={i} className="animate-pulse rounded-sm" style={{ aspectRatio: "9/16", background: GRADIENTS[(i+4)%GRADIENTS.length] }} />)}
            </div>
          )}

          {!loading && !error && reels.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reels.map((reel, i) => (
                <a href={reel.permalink} target="_blank" rel="noopener noreferrer" key={reel.id}
                  className="group relative overflow-hidden cursor-pointer block" style={{ aspectRatio: "9/16", background: GRADIENTS[(i+4)%GRADIENTS.length] }}>
                  {(reel.thumbnail_url ?? reel.media_url) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={(reel.thumbnail_url ?? reel.media_url)!} alt={shortCaption(reel.caption) || "Instagram Reel"}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-between p-4" style={{ background: "linear-gradient(to top,rgba(40,32,26,0.65) 0%,transparent 50%)" }}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(253,252,250,0.9)", color: "var(--gold)" }}>
                        <FaPlay size={14} style={{ marginLeft: "2px" }} />
                      </div>
                    </div>
                    <div className="relative z-10 mt-auto">
                      {reel.caption && <p className="font-playfair text-sm md:text-base leading-snug mb-1 text-white line-clamp-2">{shortCaption(reel.caption)}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <a href="https://www.instagram.com/westra_wear" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-inter text-[10px] tracking-[0.35em] uppercase"
              style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-mid)" }}>
              <FaInstagram size={12} /> Watch More on Instagram <FaArrowRight size={10} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
