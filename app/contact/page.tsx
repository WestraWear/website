"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope, FaArrowRight } from "react-icons/fa";

const channels = [
  {
    idx: "01",
    icon: <FaWhatsapp size={18} />,
    label: "WhatsApp",
    detail: "+91 98xxx xxxxx",
    sub: "Fastest response · Typically within an hour",
    href: "https://wa.me/917501182583",
    accent: "#25D366",
  },
  {
    idx: "02",
    icon: <FaInstagram size={18} />,
    label: "Instagram",
    detail: "@westra_wear",
    sub: "DMs open · Browse our latest looks too",
    href: "https://www.instagram.com/westra_wear",
    accent: "#E1306C",
  },
  {
    idx: "03",
    icon: <FaFacebook size={18} />,
    label: "Facebook",
    detail: "Westra India",
    sub: "Live sales every week · Follow for alerts",
    href: "https://www.facebook.com/share/1BWf44pd5s/",
    accent: "#1877F2",
  },
  {
    idx: "04",
    icon: <FaEnvelope size={18} />,
    label: "Email",
    detail: "nathsweta9@gmail.com",
    sub: "For business enquiries &amp; collaborations",
    href: "mailto:nathsweta9@gmail.com",
    accent: "var(--gold)",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-section)", minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(var(--gold) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none font-playfair"
          style={{ fontSize: "clamp(140px,25vw,360px)", color: "rgba(155,99,53,0.06)", lineHeight: 1, letterSpacing: "-0.04em" }}
        >
          ✦
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 pt-40">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="font-inter text-[9px] tracking-[0.5em] uppercase mb-6 flex items-center gap-3"
            style={{ color: "var(--gold)" }}
          >
            <span className="w-8 h-px inline-block" style={{ background: "var(--gold)" }} />
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="font-playfair leading-[0.9]"
            style={{ fontSize: "clamp(52px,8vw,130px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}
          >
            Say<br /><em style={{ color: "var(--gold)" }}>Hello.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22,1,0.36,1] }}
            className="font-cormorant text-xl md:text-2xl italic mt-6 max-w-md"
            style={{ color: "var(--text-mid)" }}
          >
            Whether you have a question or simply want to share your style — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Channels — editorial list */}
      <section className="section-padding" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="mb-14"
          >
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "var(--gold)" }}>Reach Us</p>
            <h2 className="font-playfair text-4xl md:text-5xl" style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}>Contact Channels</h2>
          </motion.div>

          <div className="flex flex-col">
            {channels.map((ch, i) => (
              <motion.a
                key={ch.idx}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
                className="group grid grid-cols-12 gap-8 py-10 border-t items-center"
                style={{ borderColor: "rgba(155,99,53,0.12)", textDecoration: "none" }}
              >
                <div className="col-span-1 hidden md:flex">
                  <span className="font-inter text-xs" style={{ color: "var(--text-light)" }}>{ch.idx}</span>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ color: "var(--text-light)", transition: `color 0.4s cubic-bezier(0.22,1,0.36,1)` }}>
                  <span className="group-hover:text-current" style={{ transition: `color 0.4s cubic-bezier(0.22,1,0.36,1)` }}>{ch.icon}</span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3
                    className="font-playfair text-2xl md:text-3xl"
                    style={{ color: "var(--text-dark)", transition: "color 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                  >
                    <span className="group-hover:text-[var(--gold)]" style={{ transition: "color 0.4s cubic-bezier(0.22,1,0.36,1)" }}>{ch.label}</span>
                  </h3>
                  <p className="font-inter text-sm mt-1" style={{ color: "var(--text-mid)" }}>{ch.detail}</p>
                </div>
                <div className="col-span-12 md:col-span-5 md:col-start-8">
                  <p className="font-inter text-sm leading-7" style={{ color: "var(--text-light)" }} dangerouslySetInnerHTML={{ __html: ch.sub }} />
                </div>
                <div className="col-span-1 hidden md:flex justify-end">
                  <FaArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                    style={{ color: "var(--gold)", transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                  />
                </div>
              </motion.a>
            ))}
            <div className="border-t" style={{ borderColor: "rgba(155,99,53,0.12)" }} />
          </div>
        </div>
      </section>

      {/* Two-col: form + location */}
      <section className="section-padding" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Inquiry form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="lg:col-span-7"
          >
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Enquiry</p>
            <h2 className="font-playfair text-4xl md:text-5xl mb-10" style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}>
              Send a Message
            </h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: [0.22,1,0.36,1] }}
                className="p-8"
                style={{ border: "1px solid rgba(155,99,53,0.25)", background: "var(--bg-card)" }}
              >
                <p className="font-playfair text-2xl mb-2" style={{ color: "var(--gold)" }}>Message Received</p>
                <p className="font-inter text-sm" style={{ color: "var(--text-light)" }}>We'll get back to you within 24 hours. For urgent needs, please reach us on WhatsApp.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { id: "name",    label: "Your Name",    type: "text",  placeholder: "Full name"        },
                  { id: "phone",   label: "Phone",        type: "tel",   placeholder: "+91 98xxx xxxxx"  },
                  { id: "email",   label: "Email Address",type: "email", placeholder: "you@email.com"    },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)" }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(formData as Record<string,string>)[f.id]}
                      onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                      className="px-5 py-4 font-inter text-sm bg-transparent outline-none"
                      style={{ border: "1px solid rgba(155,99,53,0.2)", color: "var(--text-dark)", transition: "border-color 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)" }}>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-5 py-4 font-inter text-sm bg-transparent outline-none resize-none"
                    style={{ border: "1px solid rgba(155,99,53,0.2)", color: "var(--text-dark)", transition: "border-color 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-whatsapp self-start inline-flex items-center gap-2 px-8 py-4 font-inter text-[10px] tracking-[0.35em] uppercase mt-2"
                  style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-dark)", background: "transparent" }}
                >
                  <FaWhatsapp size={13} /> Send Message <FaArrowRight size={10} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Store info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22,1,0.36,1] }}
            className="lg:col-span-4 lg:col-start-9 flex flex-col gap-10"
          >
            <div>
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Location</p>
              <h3 className="font-playfair text-3xl mb-4" style={{ color: "var(--text-dark)" }}>Find Us</h3>
              <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>
                123 Fashion Street<br />
                Koramangala, Bengaluru<br />
                Karnataka – 560034
              </p>
            </div>

            <div style={{ width: "40px", height: "1px", background: "rgba(155,99,53,0.25)" }} />

            <div>
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Hours</p>
              <div className="flex flex-col gap-3">
                {[
                  { day: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
                  { day: "Sunday",            time: "11:00 AM – 6:00 PM" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <span className="font-inter text-sm" style={{ color: "var(--text-mid)" }}>{h.day}</span>
                    <span className="font-inter text-sm" style={{ color: "var(--text-light)" }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ width: "40px", height: "1px", background: "rgba(155,99,53,0.25)" }} />

            <div>
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: "var(--gold)" }}>Quick Reach</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/917501182583"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex items-center gap-2 px-6 py-3 font-inter text-[10px] tracking-[0.25em] uppercase self-start"
                  style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-dark)", background: "transparent" }}
                >
                  <FaWhatsapp size={12} /> WhatsApp Us
                </a>
                <a
                  href="https://www.instagram.com/westra_wear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-instagram inline-flex items-center gap-2 px-6 py-3 font-inter text-[10px] tracking-[0.25em] uppercase self-start"
                  style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-mid)" }}
                >
                  <FaInstagram size={12} /> Instagram DM
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
