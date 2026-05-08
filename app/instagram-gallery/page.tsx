"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaPlay, FaArrowRight, FaHeart, FaComment } from "react-icons/fa";

const posts = [
  { id: 1, category: "Sarees",          tag: "New Arrival",    likes: 312, comments: 28, size: "large"  },
  { id: 2, category: "Kurtis",          tag: "Best Seller",    likes: 241, comments: 19, size: "small"  },
  { id: 3, category: "Lehengas",        tag: "Festival Pick",  likes: 489, comments: 44, size: "small"  },
  { id: 4, category: "Ethnic Sets",     tag: "Trending",       likes: 198, comments: 15, size: "medium" },
  { id: 5, category: "Designer Sarees", tag: "Exclusive",      likes: 567, comments: 62, size: "large"  },
  { id: 6, category: "Anarkalis",       tag: "New Collection", likes: 223, comments: 21, size: "small"  },
  { id: 7, category: "Silk Sarees",     tag: "Heritage Weave", likes: 334, comments: 31, size: "medium" },
  { id: 8, category: "Sharara Sets",    tag: "Party Wear",     likes: 278, comments: 24, size: "small"  },
  { id: 9, category: "Palazzo Suits",   tag: "Comfort Chic",   likes: 185, comments: 17, size: "large"  },
];
const gradients = [
  "linear-gradient(145deg,#F0EAE0,#E8E0D4)",
  "linear-gradient(145deg,#EDE4D8,#E4DDD5)",
  "linear-gradient(145deg,#F4EFE8,#EBE3D9)",
  "linear-gradient(145deg,#E8E2DA,#DDD6CC)",
  "linear-gradient(145deg,#F2EDE5,#E9E1D6)",
  "linear-gradient(145deg,#EDE8E1,#E3DBD0)",
  "linear-gradient(145deg,#F0EBE2,#E6DDD2)",
  "linear-gradient(145deg,#EAE4DC,#E1D9CE)",
  "linear-gradient(145deg,#F3EDE5,#ECE4D8)",
];
const accents = ["#C6A77D","#9B6335","#B8906A","#A57850","#C9AD85","#906030","#BE9870","#AC8055","#C4A47B"];
const reels = [
  { id: 1, title: "Festive Saree Draping", views: "24K", category: "Sarees"    },
  { id: 2, title: "Kurti Styling 3 Ways",  views: "18K", category: "Kurtis"    },
  { id: 3, title: "Lehenga Lookbook",      views: "31K", category: "Lehengas"  },
  { id: 4, title: "Live Sale Highlights",  views: "42K", category: "Live Sales" },
];
const stats = [
  { value: "12K+", label: "Followers"  },
  { value: "800+", label: "Posts"      },
  { value: "4.9★", label: "Avg Rating" },
  { value: "50+",  label: "Brands"     },
];

export default function InstagramGalleryPage() {
  return (
    <div style={{ background: "var(--bg)" }}>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-section)", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(var(--gold) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none font-playfair" style={{ fontSize: "clamp(160px,28vw,400px)", color: "rgba(155,99,53,0.06)", lineHeight: 1 }}>
          @
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 pt-28 md:pt-40 w-full">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }} className="font-inter text-[9px] tracking-[0.5em] uppercase mb-6 flex items-center gap-3" style={{ color: "var(--gold)" }}>
            <FaInstagram size={10} />
            <span className="w-8 h-px inline-block" style={{ background: "var(--gold)" }} />
            @westra_wear
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22,1,0.36,1] }} className="font-playfair leading-[0.9]" style={{ fontSize: "clamp(56px,10vw,140px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}>
            Style<br /><em style={{ color: "var(--gold)" }}>Gallery</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22,1,0.36,1] }} className="font-cormorant text-xl md:text-2xl italic mt-6 max-w-lg" style={{ color: "var(--text-mid)" }}>
            Every post is a window into a wardrobe carefully curated for you.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-alt)", borderTop: "1px solid rgba(155,99,53,0.1)", borderBottom: "1px solid rgba(155,99,53,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22,1,0.36,1] }} className="flex flex-col items-center py-4 gap-1 border-r last:border-r-0" style={{ borderColor: "rgba(155,99,53,0.1)" }}>
              <span className="font-playfair text-3xl md:text-4xl" style={{ color: "var(--gold)" }}>{s.value}</span>
              <span className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)" }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }} className="flex items-end justify-between mb-14">
            <div>
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "var(--gold)" }}>Latest Posts</p>
              <h2 className="font-playfair text-4xl md:text-5xl" style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}>Recent Looks</h2>
            </div>
            <a href="https://www.instagram.com/westra_wear" target="_blank" rel="noopener noreferrer" className="btn-instagram hidden md:inline-flex items-center gap-2 px-6 py-2.5 font-inter text-[10px] tracking-[0.25em] uppercase" style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-mid)" }}>
              <FaInstagram size={11} /> View Profile <FaArrowRight size={10} />
            </a>
          </motion.div>

          <div className="columns-2 md:columns-3 gap-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22,1,0.36,1] }}
                className="group relative mb-4 overflow-hidden cursor-pointer break-inside-avoid"
                style={{ background: gradients[i], aspectRatio: post.size === "large" ? "3/4" : post.size === "medium" ? "1/1" : "4/5" }}
              >
                <div className="absolute inset-0 img-overlay-wrap group-hover:scale-105" style={{ transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }} />
                <div className="absolute inset-0" style={{ borderLeft: `3px solid ${accents[i]}40` }} />
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-inter text-[8px] tracking-[0.3em] uppercase px-2 py-1" style={{ background: "rgba(253,252,250,0.85)", color: "var(--text-dark)" }}>{post.category}</span>
                </div>
                <div className="hover-overlay absolute inset-0 z-20 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100" style={{ background: "linear-gradient(to top,rgba(40,32,26,0.75) 0%,transparent 60%)" }}>
                  <p className="font-playfair text-white text-base mb-1">{post.category}</p>
                  <span className="font-inter text-[8px] tracking-[0.25em] uppercase px-2 py-0.5 self-start mb-3" style={{ background: `${accents[i]}99`, color: "#fff" }}>{post.tag}</span>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 font-inter text-[10px] text-white/80"><FaHeart size={10} /> {post.likes}</span>
                    <span className="flex items-center gap-1.5 font-inter text-[10px] text-white/80"><FaComment size={10} /> {post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reels */}
      <section className="section-padding" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }} className="mb-14">
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "var(--gold)" }}>Video</p>
            <h2 className="font-playfair text-4xl md:text-5xl" style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}>Reels &amp; Lookbooks</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reels.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22,1,0.36,1] }}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "9/16", background: gradients[i + 4] }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <span className="font-inter text-[8px] tracking-[0.3em] uppercase self-start px-2 py-1" style={{ background: "rgba(253,252,250,0.85)", color: "var(--text-dark)" }}>{reel.category}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-btn w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: "rgba(253,252,250,0.9)", color: "var(--gold)" }}>
                      <FaPlay size={14} style={{ marginLeft: "2px" }} />
                    </div>
                  </div>
                  <div>
                    <p className="font-playfair text-sm md:text-base leading-snug mb-1" style={{ color: "var(--text-dark)" }}>{reel.title}</p>
                    <p className="font-inter text-[9px]" style={{ color: "var(--text-light)" }}>{reel.views} views</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease: [0.22,1,0.36,1] }} className="mt-12 flex justify-center">
            <a href="https://www.instagram.com/westra_wear" target="_blank" rel="noopener noreferrer" className="btn-instagram inline-flex items-center gap-2 px-8 py-4 font-inter text-[10px] tracking-[0.35em] uppercase" style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-mid)" }}>
              <FaInstagram size={12} /> Watch More on Instagram <FaArrowRight size={10} />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
