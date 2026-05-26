import type { Metadata } from "next";
import LiveCalendarWidget from "./LiveCalendarWidget";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const dynamic = "force-dynamic";

const BASE = "https://westrawear.com";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function fetchLives() {
  try {
    const res = await fetch(`${API}/social/facebook/lives`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Live Sales | Shop Live on Facebook & Instagram | Westra Wear",
  description: "Join Westra Wear's live shopping sessions on Facebook and Instagram. Watch, comment to claim, and enjoy exclusive live-only deals on women's fashion.",
  keywords: ["live sale women fashion India", "Facebook live shopping", "Instagram live fashion", "live shopping India", "Westra Wear live sale", "comment to buy India"],
  alternates: { canonical: `${BASE}/live-sales` },
  openGraph: { type: "website", locale: "en_IN", url: `${BASE}/live-sales`, siteName: "Westra Wear", title: "Live Sales | Shop Live on Facebook & Instagram | Westra Wear", description: "Join Westra Wear live shopping sessions — watch, comment to claim, exclusive live deals.", images: [{ url: `${BASE}/og-live.jpg`, width: 1200, height: 630, alt: "Westra Wear Live Sales" }] },
  twitter: { card: "summary_large_image", site: "@westra_wear", title: "Live Sales | Westra Wear", description: "Shop live on Facebook & Instagram — comment to claim exclusive deals.", images: [`${BASE}/og-live.jpg`] },
};

const HOW_IT_WORKS = [
  { step: "01", title: "Follow Us", body: "Follow Westra Wear on Facebook and Instagram so you never miss a live sale notification." },
  { step: "02", title: "Join the Live", body: "When we go live, join the session. Watch us showcase pieces in real light with honest details." },
  { step: "03", title: "Comment to Claim", body: "See something you love? Comment \"Sold\" or the item number. First comment wins the piece." },
  { step: "04", title: "Confirm & Pay", body: "We reach out on WhatsApp to confirm size and delivery details. Easy, personal, and fast." },
];

const FAQS = [
  { q: "What time are the live sales?", a: "We typically go live in the evenings between 7–10 PM IST, 3–4 times a week. Check the calendar below or follow us for notifications." },
  { q: "How do I claim a product?", a: "Comment the item number or 'Sold' on the live. First valid comment gets it. We'll message you on WhatsApp to confirm." },
  { q: "Can I reserve a product before the live?", a: "Not directly — live sales are first-come-first-served. However, you can message us on WhatsApp to ask about upcoming pieces." },
  { q: "What if I miss the live?", a: "Some recordings are saved to our Facebook page. You can also message us on WhatsApp — we may have the item available in our next sale." },
];

export default async function LiveSalesPage() {
  const lives = await fetchLives();
  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden flex flex-col justify-end px-8 md:px-16 lg:px-24" style={{ height: "55vh", minHeight: 340, background: "var(--bg)", borderBottom: "1px solid rgba(155,99,53,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(155,99,53,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 pb-12 md:pb-16">
          <h1 className="font-playfair" style={{ fontSize: "clamp(40px, 5.5vw, 88px)", color: "var(--text-dark)", letterSpacing: "-0.03em", lineHeight: 0.9 }}>
            Shop <em style={{ color: "var(--gold)" }}>Live</em>
          </h1>
          <p className="mt-5 font-inter text-sm max-w-xl" style={{ color: "var(--text-light)", lineHeight: 1.8 }}>
            Join us live on Facebook and Instagram for exclusive deals, new arrivals and honest styling advice — straight from our studio to you.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="https://www.facebook.com/share/1BWf44pd5s/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 text-white font-inter text-[10px] tracking-[0.25em] uppercase hover:opacity-90 transition-opacity" style={{ background: "#1877F2" }}>
              <FaFacebook size={12} /> Facebook Live
            </a>
            <a href="https://www.instagram.com/westra.wear/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 text-white font-inter text-[10px] tracking-[0.25em] uppercase hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
              <FaInstagram size={12} /> Instagram Live
            </a>
          </div>
        </div>
      </section>

      {/* Live Calendar */}
      <LiveCalendarWidget initialLives={lives} />

      {/* How it works */}
      <section className="py-16 md:py-28" style={{ background: "var(--bg-section)", borderTop: "1px solid rgba(155,99,53,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12 md:mb-20">
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "var(--gold)" }}>The Process</p>
            <h2 className="font-playfair" style={{ fontSize: "clamp(28px, 3.5vw, 52px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}>How Live Shopping Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex flex-col gap-5">
                <span className="font-inter text-[10px]" style={{ color: "var(--gold)", letterSpacing: "0.3em" }}>{item.step}</span>
                <div className="w-12 h-px" style={{ background: "rgba(155,99,53,0.25)" }} />
                <h3 className="font-playfair text-2xl" style={{ color: "var(--text-dark)", letterSpacing: "-0.01em" }}>{item.title}</h3>
                <p className="font-inter text-sm leading-7" style={{ color: "var(--text-light)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-28" style={{ background: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: "var(--gold)" }}>FAQ</p>
            <h2 className="font-playfair" style={{ fontSize: "clamp(24px, 3vw, 44px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}>Common Questions</h2>
          </div>
          <div className="flex flex-col divide-y" style={{ borderColor: "rgba(155,99,53,0.1)" }}>
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-8">
                <h3 className="font-playfair text-lg mb-3" style={{ color: "var(--text-dark)" }}>{faq.q}</h3>
                <p className="font-inter text-sm leading-7" style={{ color: "var(--text-light)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 md:py-20 text-center" style={{ background: "var(--bg-section)", borderTop: "1px solid rgba(155,99,53,0.08)" }}>
        <div className="max-w-2xl mx-auto px-4">
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Never miss a live</p>
          <h3 className="font-playfair mb-8" style={{ fontSize: "clamp(22px, 3vw, 40px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}>
            Get notified on <em style={{ color: "var(--gold)" }}>WhatsApp</em>
          </h3>
          <a href="https://wa.me/917501182583" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 text-white font-inter text-[10px] tracking-[0.25em] uppercase" style={{ background: "#25D366" }}>
            <FaWhatsapp size={14} /> Join WhatsApp Updates
          </a>
        </div>
      </section>
    </div>
  );
}
