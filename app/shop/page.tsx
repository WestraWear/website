"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { FaShoppingBag } from "react-icons/fa";

const CATEGORIES = ["All", "Sarees", "Kurtis", "Ethnic Wear", "Party Collection", "Seasonal"];

const GRADIENTS: Record<string, string> = {
  Sarees: "linear-gradient(145deg,#F0EAE0,#E8E0D4)",
  Kurtis: "linear-gradient(145deg,#EDE4D8,#E4DDD5)",
  "Ethnic Wear": "linear-gradient(145deg,#F4EFE8,#EBE3D9)",
  "Party Collection": "linear-gradient(145deg,#EAE4DC,#E1D9CE)",
  Seasonal: "linear-gradient(145deg,#F2EDE5,#E9E1D6)",
  default: "linear-gradient(145deg,#F0EAE0,#E8E0D4)",
};

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }
    setAdding(true);
    add({
      product_id: product.id,
      name: product.name,
      size: selectedSize || "One Size",
      qty: 1,
      price: product.price,
    });
    setTimeout(() => setAdding(false), 800);
  };

  const bg = GRADIENTS[product.category] ?? GRADIENTS.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col"
      style={{ background: "var(--bg-card)", border: "1px solid rgba(184,149,106,0.1)" }}
    >
      {/* Image placeholder */}
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{ background: bg }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-playfair text-7xl italic opacity-10"
            style={{ color: "var(--gold)" }}>W</span>
        </div>
        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(248,244,238,0.75)" }}>
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--text-light)" }}>Out of Stock</span>
          </div>
        )}
        {product.tags[0] && (
          <div className="absolute top-3 left-3">
            <span className="font-inter text-[8px] tracking-[0.2em] uppercase px-2 py-1"
              style={{ background: "var(--bg-card)", color: "var(--gold)" }}>
              {product.tags[0]}
            </span>
          </div>
        )}
        {product.original_price && (
          <div className="absolute top-3 right-3">
            <span className="font-inter text-[8px] tracking-[0.2em] uppercase px-2 py-1"
              style={{ background: "var(--gold)", color: "#fff" }}>
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <p className="font-inter text-[9px] tracking-[0.3em] uppercase mb-1"
            style={{ color: "var(--gold)" }}>{product.category}</p>
          <h3 className="font-playfair text-lg leading-tight"
            style={{ color: "var(--text-dark)" }}>{product.name}</h3>
          <p className="font-inter text-xs mt-1 leading-5"
            style={{ color: "var(--text-light)" }}>{product.tagline}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-playfair text-xl" style={{ color: "var(--text-dark)" }}>
            ₹{product.price.toLocaleString()}
          </span>
          {product.original_price && (
            <span className="font-inter text-sm line-through"
              style={{ color: "var(--text-light)" }}>
              ₹{product.original_price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Size selector */}
        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s === selectedSize ? "" : s)}
                className="px-2.5 py-1 font-inter text-[10px] tracking-wide transition-all duration-150"
                style={{
                  border: `1px solid ${s === selectedSize ? "var(--gold)" : "rgba(184,149,106,0.25)"}`,
                  background: s === selectedSize ? "rgba(155,99,53,0.08)" : "transparent",
                  color: s === selectedSize ? "var(--gold)" : "var(--text-light)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={!product.in_stock || adding}
          className="w-full py-3 font-inter text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40"
          style={{
            border: "1px solid var(--gold)",
            color: adding ? "#fff" : "var(--gold)",
            background: adding ? "var(--gold)" : "transparent",
          }}
        >
          <FaShoppingBag size={11} />
          {adding ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState(false);

  useEffect(() => {
    api.products
      .list({ in_stock: undefined })
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-section)", minHeight: "40vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(var(--gold) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none font-playfair leading-none"
          style={{ fontSize: "clamp(160px,25vw,360px)", color: "rgba(155,99,53,0.05)", fontStyle: "italic" }}
        >
          Shop
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-28 w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4 flex items-center gap-3"
            style={{ color: "var(--gold)" }}
          >
            <span className="w-8 h-px inline-block" style={{ background: "var(--gold)" }} />
            Online Store
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-playfair leading-[0.9]"
            style={{ fontSize: "clamp(52px,8vw,110px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}
          >
            Shop<br />
            <em style={{ color: "var(--gold)" }}>Westra</em>
          </motion.h1>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-[60px] z-30 border-b overflow-x-auto"
        style={{ background: "rgba(248,244,238,0.96)", borderColor: "rgba(155,99,53,0.1)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-0 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-inter text-[10px] tracking-[0.25em] uppercase px-4 md:px-5 py-4 border-r whitespace-nowrap transition-colors duration-200"
                style={{
                  borderColor: "rgba(155,99,53,0.1)",
                  color: activeCategory === cat ? "var(--gold)" : "var(--text-light)",
                  borderBottom: activeCategory === cat ? "2px solid var(--gold)" : "2px solid transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse"
                  style={{ background: "var(--bg-alt)" }} />
              ))}
            </div>
          ) : error ? (
            <div className="py-24 text-center flex flex-col items-center gap-4">
              <span className="font-playfair text-5xl italic opacity-20" style={{ color: "var(--gold)" }}>W</span>
              <p className="font-inter text-sm" style={{ color: "var(--text-light)" }}>
                Could not load products. Please try again later.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-inter text-sm" style={{ color: "var(--text-light)" }}>
                No products in this category yet.
              </p>
            </div>
          ) : (
            <>
              <p className="font-inter text-[10px] tracking-[0.25em] uppercase mb-8"
                style={{ color: "var(--text-light)" }}>
                {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
