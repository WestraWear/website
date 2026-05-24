import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

const BASE = "https://westra.in";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch | Westra Wear",
  description: "Reach out to Westra Wear for fashion enquiries, order support, collaborations or just to say hello. We're available on WhatsApp, Instagram, Facebook and email.",
  keywords: ["contact Westra Wear", "Westra Wear WhatsApp", "women's fashion enquiry India", "fashion brand contact Kolkata"],
  alternates: { canonical: `${BASE}/contact` },
  openGraph: { type: "website", locale: "en_IN", url: `${BASE}/contact`, siteName: "Westra Wear", title: "Contact Us | Westra Wear", description: "Get in touch with Westra Wear — WhatsApp, Instagram, Facebook or email.", images: [{ url: `${BASE}/og-contact.jpg`, width: 1200, height: 630, alt: "Contact Westra Wear" }] },
  twitter: { card: "summary_large_image", site: "@westra_wear", title: "Contact Us | Westra Wear", description: "Get in touch with Westra Wear on WhatsApp, Instagram, Facebook or email.", images: [`${BASE}/og-contact.jpg`] },
};
  
const CHANNELS = [
  { label: "WhatsApp", handle: "+91 75011 82583", color: "#25D366", Icon: FaWhatsapp, desc: "Fastest response. Message us for order help, sizing or enquiries.", href: "https://wa.me/917501182583" },
  { label: "Instagram", handle: "@westra_wear", color: "#E1306C", Icon: FaInstagram, desc: "DM us on Instagram for styling advice or collaboration enquiries.", href: "https://www.instagram.com/westra_wear/" },
  { label: "Facebook", handle: "Westra Wear", color: "#1877F2", Icon: FaFacebook, desc: "Message or comment on our Facebook page. We go live here too.", href: "https://www.facebook.com/share/1BWf44pd5s/" },
  { label: "Email", handle: "nathsweta9@gmail.com", color: "var(--gold)", Icon: FaEnvelope, desc: "For detailed enquiries, collaborations or press. We reply within 24h.", href: "mailto:nathsweta9@gmail.com" },
];

export default function ContactPage() {
  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative flex flex-col justify-end px-8 md:px-16 lg:px-24" style={{ height: "50vh", minHeight: 300, background: "var(--bg)", borderBottom: "1px solid rgba(155,99,53,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(155,99,53,0.06) 0%, transparent 65%)" }} />
        <div className="relative z-10 pb-10 md:pb-14">
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>We'd love to hear from you</p>
          <h1 className="font-playfair" style={{ fontSize: "clamp(44px, 6vw, 96px)", color: "var(--text-dark)", letterSpacing: "-0.03em", lineHeight: 0.9 }}>
            Say <em style={{ color: "var(--gold)" }}>Hello.</em>
          </h1>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-section)", borderBottom: "1px solid rgba(155,99,53,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-10" style={{ color: "var(--gold)" }}>Ways to Reach Us</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANNELS.map(({ label, handle, color, Icon, desc, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 p-7 group transition-transform hover:-translate-y-0.5" style={{ background: "var(--bg)", border: "1px solid rgba(155,99,53,0.1)", borderTop: `3px solid ${color}` }}>
                <Icon size={22} style={{ color }} />
                <div>
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-light)" }}>{label}</p>
                  <p className="font-playfair text-lg" style={{ color: "var(--text-dark)" }}>{handle}</p>
                </div>
                <p className="font-inter text-xs leading-6" style={{ color: "var(--text-light)" }}>{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Location */}
      <section className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Send a Message</p>
              <h2 className="font-playfair mb-8" style={{ fontSize: "clamp(24px, 2.5vw, 40px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}>Leave us a note</h2>
              <ContactForm />
            </div>

            {/* Location + Hours */}
            <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-16">
              <div>
                <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Our Location</p>
                <p className="font-playfair text-2xl mb-3" style={{ color: "var(--text-dark)" }}>Kolkata, West Bengal</p>
                <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>
                  Subhas Sarobar Park<br />
                  Ghoshal Para, Beleghata<br />
                  Kolkata, WB — 700010<br />
                  India
                </p>
              </div>
              <div className="w-12 h-px" style={{ background: "rgba(155,99,53,0.2)" }} />
              <div>
                <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Business Hours</p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between font-inter text-sm" style={{ color: "var(--text-light)" }}>
                    <span>Monday – Saturday</span><span style={{ color: "var(--text-dark)" }}>10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between font-inter text-sm" style={{ color: "var(--text-light)" }}>
                    <span>Sunday</span><span style={{ color: "var(--text-dark)" }}>11:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
