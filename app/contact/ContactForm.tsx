"use client";

import { useState } from "react";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="p-8" style={{ border: "1px solid rgba(155,99,53,0.25)", background: "var(--bg-card)" }}>
        <p className="font-playfair text-2xl mb-2" style={{ color: "var(--gold)" }}>Message Received</p>
        <p className="font-inter text-sm" style={{ color: "var(--text-light)" }}>
          We&apos;ll get back to you within 24 hours. For urgent needs, please reach us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {[
        { id: "name",  label: "Your Name",    type: "text",  placeholder: "Full name"        },
        { id: "phone", label: "Phone",         type: "tel",   placeholder: "+91 98xxx xxxxx"  },
        { id: "email", label: "Email Address", type: "email", placeholder: "you@email.com"    },
      ].map((f) => (
        <div key={f.id} className="flex flex-col gap-2">
          <label className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)" }}>{f.label}</label>
          <input
            type={f.type}
            placeholder={f.placeholder}
            value={(formData as Record<string, string>)[f.id]}
            onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
            className="px-5 py-4 font-inter text-sm bg-transparent outline-none"
            style={{ border: "1px solid rgba(155,99,53,0.2)", color: "var(--text-dark)" }}
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
          style={{ border: "1px solid rgba(155,99,53,0.2)", color: "var(--text-dark)" }}
        />
      </div>
      <button
        type="submit"
        className="self-start inline-flex items-center gap-2 px-8 py-4 font-inter text-[10px] tracking-[0.35em] uppercase mt-2"
        style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-dark)", background: "transparent" }}
      >
        <FaWhatsapp size={13} /> Send Message <FaArrowRight size={10} />
      </button>
    </form>
  );
}
