"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";
import { FaWhatsapp } from "react-icons/fa";

export default function CartDrawer() {
  const { items, remove, update, total, count, open, setOpen, validating } = useCart();
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(40,32,26,0.45)", backdropFilter: "blur(4px)" }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-full max-w-md"
              style={{ background: "var(--bg)", borderLeft: "1px solid rgba(184,149,106,0.15)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b"
                style={{ borderColor: "rgba(184,149,106,0.12)" }}>
                <div>
                  <h2 className="font-playfair text-2xl" style={{ color: "var(--text-dark)" }}>Your Cart</h2>
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase mt-0.5"
                    style={{ color: "var(--text-light)" }}>
                    {count} {count === 1 ? "item" : "items"}
                    {validating && (
                      <span className="ml-2 opacity-60">· Checking stock…</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-xl transition-opacity hover:opacity-50"
                  style={{ color: "var(--text-mid)" }}
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
                    <span className="font-playfair text-5xl italic" style={{ color: "var(--gold)" }}>W</span>
                    <p className="font-inter text-sm" style={{ color: "var(--text-light)" }}>Your cart is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product_id}-${item.size}`}
                      className="flex items-start gap-4 py-4 border-b"
                      style={{ borderColor: "rgba(184,149,106,0.08)" }}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-20 shrink-0 overflow-hidden"
                        style={{ background: "var(--bg-alt)" }}>
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-playfair text-2xl italic opacity-20"
                              style={{ color: "var(--gold)" }}>W</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-base leading-tight mb-0.5"
                          style={{ color: "var(--text-dark)" }}>{item.name}</p>
                        <p className="font-inter text-[10px] tracking-[0.15em] uppercase mb-2"
                          style={{ color: "var(--gold)" }}>Size: {item.size}</p>
                        {item.warning && (
                          <p className="font-inter text-[10px] tracking-[0.12em] uppercase mb-1 px-2 py-0.5 inline-block"
                            style={{
                              background: item.warning === "out_of_stock"
                                ? "rgba(239,68,68,0.12)"
                                : "rgba(234,179,8,0.15)",
                              color: item.warning === "out_of_stock" ? "#ef4444" : "#ca8a04",
                            }}>
                            {item.warning === "out_of_stock" ? "Out of stock" : "Price updated"}
                          </p>
                        )}
                        <p className="font-playfair text-sm mb-3"
                          style={{ color: "var(--text-mid)" }}>₹{item.price.toLocaleString()}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border"
                            style={{ borderColor: "rgba(184,149,106,0.2)" }}>
                            <button
                              className="w-7 h-7 flex items-center justify-center text-sm transition-opacity hover:opacity-60"
                              style={{ color: "var(--text-mid)" }}
                              onClick={() => update(item.product_id, item.size, item.qty - 1)}
                            >−</button>
                            <span className="w-7 text-center font-inter text-xs"
                              style={{ color: "var(--text-dark)" }}>{item.qty}</span>
                            <button
                              className="w-7 h-7 flex items-center justify-center text-sm transition-opacity hover:opacity-60"
                              style={{ color: "var(--text-mid)" }}
                              onClick={() => update(item.product_id, item.size, item.qty + 1)}
                            >+</button>
                          </div>
                          <button
                            className="font-inter text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
                            style={{ color: "var(--text-light)" }}
                            onClick={() => remove(item.product_id, item.size)}
                          >Remove</button>
                        </div>
                      </div>

                      <p className="font-playfair text-base shrink-0"
                        style={{ color: "var(--text-dark)" }}>
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t flex flex-col gap-4"
                  style={{ borderColor: "rgba(184,149,106,0.12)" }}>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-sm" style={{ color: "var(--text-light)" }}>Total</span>
                    <span className="font-playfair text-2xl" style={{ color: "var(--text-dark)" }}>
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  {items.some((i) => i.warning === "out_of_stock") && (
                    <p className="font-inter text-[10px] tracking-[0.1em] text-center"
                      style={{ color: "#ef4444" }}>
                      Remove out-of-stock items to proceed
                    </p>
                  )}
                  <button
                    disabled={items.some((i) => i.warning === "out_of_stock")}
                    onClick={() => { setOpen(false); setCheckout(true); }}
                    className="w-full py-4 font-inter text-[10px] tracking-[0.35em] uppercase flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--gold)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Proceed to Checkout
                  </button>
                  <a
                    href="https://wa.me/917501182583"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 font-inter text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 btn-whatsapp"
                    style={{ border: "1px solid rgba(184,149,106,0.3)", color: "var(--text-mid)" }}
                  >
                    <FaWhatsapp size={12} /> Order via WhatsApp
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </>
  );
}
