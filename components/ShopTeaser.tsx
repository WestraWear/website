"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { api, Product } from "@/lib/api";

const CATEGORY_ACCENTS: Record<string, string> = {
  "Cord Set":  "#C6A77D",
  Kaftan:      "#9B6335",
  Salwar:      "#8C7E72",
  "Two Piece": "#C6A77D",
  Tops:        "#9B6335",
  Shirts:      "#8C7E72",
  Frocks:      "#C6A77D",
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const accent = CATEGORY_ACCENTS[product.category] ?? "#C6A77D";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
      style={{ border: "1px solid rgba(184,149,106,0.1)", background: "var(--bg-card)" }}
    >
      {/* Image area */}
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{ background: `linear-gradient(145deg,${accent}18,${accent}08)` }}
      >
        {product.image_placeholder ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_placeholder}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-playfair text-7xl italic opacity-10"
              style={{ color: accent }}
            >
              W
            </span>
          </div>
        )}
        {!product.in_stock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(248,244,238,0.75)" }}
          >
            <span
              className="font-inter text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--text-light)" }}
            >
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className="font-inter text-[8px] tracking-[0.2em] uppercase px-2 py-1"
            style={{ background: "var(--bg-card)", color: accent }}
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <h3
          className="font-playfair text-lg leading-tight"
          style={{ color: "var(--text-dark)" }}
        >
          {product.name}
        </h3>
        {product.tagline && (
          <p
            className="font-inter text-xs leading-5"
            style={{ color: "var(--text-light)" }}
          >
            {product.tagline}
          </p>
        )}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-playfair text-xl" style={{ color: "var(--text-dark)" }}>
            ₹{product.price.toLocaleString()}
          </span>
          {product.original_price && (
            <span
              className="font-inter text-sm line-through"
              style={{ color: "var(--text-light)" }}
            >
              ₹{product.original_price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.products
      .list({ in_stock: true })
      .then((data) => setProducts(data.slice(0, 8)))
      .catch(() => {});
  }, []);

  // If no products returned from API, show a clean placeholder state
  const showSkeletons = products.length === 0;

  return (
    <section className="section-padding" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8" ref={ref}>

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span
                className="font-inter text-[9px] tracking-[0.5em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                Online Store
              </span>
            </div>
            <h2
              className="font-playfair leading-tight"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              Shop Now,
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                Delivered to You
              </em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-xs">
            <p
              className="font-inter text-sm leading-7"
              style={{ color: "var(--text-light)" }}
            >
              Browse our curated catalogue, add to cart, and checkout securely
              — all without leaving home.
            </p>
            <Link
              href="/shop"
              className="group font-inter text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 transition-opacity duration-300 hover:opacity-60 self-start"
              style={{ color: "var(--text-dark)" }}
            >
              <span>View Full Shop</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Product grid */}
        {showSkeletons ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse"
                style={{ background: "var(--bg-alt)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p, i) => (
              <Link key={p.id} href="/shop">
                <ProductCard product={p} index={i} />
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t"
          style={{ borderColor: "rgba(184,149,106,0.12)" }}
        >
          <p
            className="font-inter text-sm"
            style={{ color: "var(--text-light)" }}
          >
            New pieces added every week. All orders shipped with care.
          </p>
          <Link
            href="/shop"
            className="px-8 py-3.5 font-inter text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-80 flex items-center gap-2 shrink-0"
            style={{ background: "var(--gold)", color: "#fff" }}
          >
            Browse All Pieces →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
