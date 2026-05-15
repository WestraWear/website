"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { api, Order } from "@/lib/api";
import { generateReceipt } from "@/lib/generateReceipt";
import { FaWhatsapp, FaDownload, FaBolt } from "react-icons/fa";

type Props = { open: boolean; onClose: () => void };

// Razorpay window type augmentation
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutModal({ open, onClose }: Props) {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    customer_address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<Order | null>(null);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Lock page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => {
    setDone(null);
    onClose();
  };

  // ── Razorpay ───────────────────────────────────────────────────────────────
  const submitRazorpay = async () => {
    if (!window.Razorpay) {
      toast.error("Payment gateway not loaded. Please refresh the page.");
      return;
    }

    // Step 1 — create Razorpay order
    const amount_paise = Math.round(total * 100);
    let rpOrder;
    try {
      rpOrder = await api.payments.createOrder(amount_paise, `receipt_${Date.now()}`);
    } catch {
      toast.error("Could not initiate payment. Please try again.");
      return;
    }

    // Step 2 — open Razorpay modal
    await new Promise<void>((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: rpOrder.key_id,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        order_id: rpOrder.order_id,
        name: "Westra Wear",
        description: "Fashion Order",
        prefill: {
          name: form.customer_name,
          contact: form.customer_phone,
          email: form.customer_email || undefined,
        },
        theme: { color: "#B89560" },
        modal: {
          ondismiss: () => reject(new Error("dismissed")),
        },
        // Step 3 — on success, send all three tokens to verify endpoint
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const order = await api.payments.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer_name: form.customer_name,
              customer_phone: form.customer_phone,
              customer_email: form.customer_email || undefined,
              customer_address: form.customer_address,
              items: items.map((i) => ({
                product_id: i.product_id,
                product_name: i.name,
                size: i.size,
                qty: i.qty,
                price: i.price,
              })),
              total,
              notes: form.notes || undefined,
            });
            setDone(order);
            clear();
            resolve();
          } catch {
            toast.error("Payment received but verification failed. Please contact support.");
            reject(new Error("verification failed"));
          }
        },
      });
      rzp.open();
    }).catch((err: Error) => {
      if (err.message !== "dismissed") {
        toast.error("Payment error. Please try again.");
      }
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitRazorpay();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(40,32,26,0.55)", backdropFilter: "blur(6px)" }}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div
              data-lenis-prevent
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
              style={{ background: "var(--bg)", border: "1px solid rgba(184,149,106,0.18)" }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5 border-b sticky top-0"
                style={{ background: "var(--bg)", borderColor: "rgba(184,149,106,0.12)" }}
              >
                <h2 className="font-playfair text-2xl" style={{ color: "var(--text-dark)" }}>
                  {done ? "Order Placed!" : "Checkout"}
                </h2>
                <button onClick={handleClose} className="transition-opacity hover:opacity-50 text-xl" style={{ color: "var(--text-mid)" }}>✕</button>
              </div>

              <div className="px-6 py-6">
                {done ? (
                  /* ── Success state ── */
                  <div className="flex flex-col items-center gap-6 py-8 text-center">
                    <span className="font-playfair text-6xl italic" style={{ color: "var(--gold)" }}>✓</span>
                    <div>
                      <p className="font-playfair text-2xl mb-2" style={{ color: "var(--text-dark)" }}>
                        Thank you!
                      </p>
                      <p className="font-inter text-sm mb-1" style={{ color: "var(--text-light)" }}>
                        Order <strong style={{ color: "var(--gold)" }}>{done.order_number}</strong> confirmed.
                      </p>
                      {done.payment_method === "razorpay" ? (
                        <p className="font-inter text-xs mt-1" style={{ color: "var(--text-light)" }}>
                          Payment received · ID: <span style={{ color: "var(--gold)" }}>{done.razorpay_payment_id}</span>
                        </p>
                      ) : (
                        <p className="font-inter text-sm" style={{ color: "var(--text-light)" }}>
                          We&apos;ll contact you on WhatsApp to confirm delivery details.
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
                      <button
                        onClick={() => void generateReceipt(done)}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-inter text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-70"
                        style={{ background: "var(--gold)", color: "#fff" }}
                      >
                        <FaDownload size={10} /> Download Receipt
                      </button>
                      <a
                        href="https://wa.me/917501182583"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-inter text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-70"
                        style={{ border: "1px solid rgba(184,149,106,0.35)", color: "var(--gold)" }}
                      >
                        <FaWhatsapp size={12} /> Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={submit} className="flex flex-col gap-4">
                    {/* Order summary */}
                    <div className="mb-2 p-4" style={{ background: "var(--bg-alt)" }}>
                      <p className="font-inter text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: "var(--gold)" }}>Order Summary</p>
                      {items.map((item) => (
                        <div key={`${item.product_id}-${item.size}`} className="flex justify-between py-1.5 font-inter text-xs" style={{ color: "var(--text-mid)" }}>
                          <span>{item.name} × {item.qty} <span style={{ color: "var(--text-light)" }}>({item.size})</span></span>
                          <span>₹{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 mt-2 border-t font-playfair text-base" style={{ borderColor: "rgba(184,149,106,0.15)", color: "var(--text-dark)" }}>
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Fields */}
                    {([
                      { id: "customer_name",    label: "Full Name",              type: "text",  placeholder: "Your name",                required: true  },
                      { id: "customer_phone",   label: "WhatsApp / Phone",       type: "tel",   placeholder: "+91 98xxx xxxxx",          required: true  },
                      { id: "customer_email",   label: "Email (optional)",       type: "email", placeholder: "you@email.com",            required: false },
                      { id: "customer_address", label: "Delivery Address",       type: "text",  placeholder: "Street, City, State, PIN", required: true  },
                    ] as { id: keyof typeof form; label: string; type: string; placeholder: string; required: boolean }[]).map((f) => (
                      <div key={f.id} className="flex flex-col gap-1.5">
                        <label className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)" }}>{f.label}</label>
                        <input
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={form[f.id]}
                          onChange={(e) => set(f.id, e.target.value)}
                          className="px-4 py-3 font-inter text-sm bg-transparent outline-none"
                          style={{ border: "1px solid rgba(155,99,53,0.2)", color: "var(--text-dark)" }}
                        />
                      </div>
                    ))}

                    {/* Notes */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)" }}>Notes (optional)</label>
                      <textarea
                        rows={2}
                        placeholder="Special requests, size notes..."
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        className="px-4 py-3 font-inter text-sm bg-transparent outline-none resize-none"
                        style={{ border: "1px solid rgba(155,99,53,0.2)", color: "var(--text-dark)" }}
                      />
                    </div>

                    <p className="font-inter text-[9px]" style={{ color: "var(--text-light)" }}>
                      <FaBolt size={9} className="inline mr-1" style={{ color: "var(--gold)" }} />
                      Secured by Razorpay · Cards, UPI, Net Banking &amp; more
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full py-4 font-inter text-[10px] tracking-[0.35em] uppercase flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                      style={{ background: "var(--gold)", color: "#fff", border: "none" }}
                    >
                      {loading ? "Processing…" : <><FaBolt size={10} /> Pay ₹{total.toLocaleString()}</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}