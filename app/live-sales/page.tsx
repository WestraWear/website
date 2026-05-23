"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaArrowRight, FaChevronLeft, FaChevronRight, FaWhatsapp } from "react-icons/fa";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const ACCENT_CYCLE = ["#C6A77D", "#D4BC9A", "#A5A8D4", "#B8906A", "#9B8560"];

// ── Types ────────────────────────────────────────────────────────────

interface FBLive {
  id: string;
  title?: string;
  status: string; // "LIVE" | "SCHEDULED_UNPUBLISHED" | "VOD" | etc.
  planned_start_time?: string; // ISO-8601
  permalink_url?: string;
}

/** Map of "YYYY-MM-DD" → live event info shown on the calendar */
interface CalendarEvent {
  title: string;
  time: string;
  accent: string;
  permalink?: string;
  status: string;
}

// ── Helpers ─────────────────────────────────────────────────────────

function toDateKey(iso: string): string {
  // Return "YYYY-MM-DD" in local time
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildCalendarMap(lives: FBLive[]): Map<string, CalendarEvent> {
  const map = new Map<string, CalendarEvent>();
  let accentIdx = 0;
  for (const live of lives) {
    if (!live.planned_start_time) continue;
    const key = toDateKey(live.planned_start_time);
    if (!map.has(key)) {
      map.set(key, {
        title: live.title ?? "Westra Live",
        time: formatTime(live.planned_start_time),
        accent: ACCENT_CYCLE[accentIdx % ACCENT_CYCLE.length],
        permalink: live.permalink_url,
        status: live.status,
      });
      accentIdx++;
    }
  }
  return map;
}

// ── Calendar ────────────────────────────────────────────────────────

interface LiveCalendarProps {
  events: Map<string, CalendarEvent>;
}

function LiveCalendar({ events }: LiveCalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [hovered, setHovered] = useState<number | null>(null);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(viewDate);

  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const cellKey = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  // Unique events shown in legend (only those visible this month)
  const legendEvents: CalendarEvent[] = [];
  const seenTitles = new Set<string>();
  for (let d = 1; d <= daysInMonth; d++) {
    const ev = events.get(cellKey(d));
    if (ev && !seenTitles.has(ev.title)) {
      legendEvents.push(ev);
      seenTitles.add(ev.title);
    }
  }

  return (
    <div className="overflow-visible" style={{ border: "1px solid rgba(155,99,53,0.16)", background: "var(--bg-card)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: "rgba(155,99,53,0.1)", background: "var(--bg-section)" }}>
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-[rgba(155,99,53,0.1)]"
          style={{ color: "var(--text-mid)" }}
        >
          <FaChevronLeft size={11} />
        </button>
        <div className="text-center">
          <p className="font-playfair text-2xl" style={{ color: "var(--text-dark)" }}>{monthName}</p>
          <p className="font-inter text-[10px] tracking-[0.35em] uppercase mt-0.5" style={{ color: "var(--text-light)" }}>{year}</p>
        </div>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-[rgba(155,99,53,0.1)]"
          style={{ color: "var(--text-mid)" }}
        >
          <FaChevronRight size={11} />
        </button>
      </div>

      {/* DOW headers */}
      <div className="grid grid-cols-7" style={{ borderBottom: "1px solid rgba(155,99,53,0.08)" }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, idx) => (
          <div
            key={d}
            className="py-3 text-center font-inter text-[9px] tracking-[0.3em] uppercase"
            style={{
              color: "var(--text-light)",
              borderRight: idx < 6 ? "1px solid rgba(155,99,53,0.06)" : undefined,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          const liveInfo   = day ? events.get(cellKey(day)) ?? null : null;
          const todayCell  = day ? isToday(day) : false;

          return (
            <div
              key={idx}
              className="relative border-r border-b"
              style={{
                minHeight: "88px",
                borderColor: "rgba(155,99,53,0.06)",
                background: todayCell ? "rgba(155,99,53,0.05)" : undefined,
              }}
              onMouseEnter={() => day && liveInfo ? setHovered(idx) : undefined}
              onMouseLeave={() => setHovered(null)}
            >
              {day && (
                <div className="p-2 h-full flex flex-col">
                  {/* Date number */}
                  <span
                    className="font-inter text-xs self-end leading-none"
                    style={{
                      color: todayCell ? "var(--gold)" : liveInfo ? "var(--text-dark)" : "var(--text-light)",
                      fontWeight: todayCell ? 700 : liveInfo ? 600 : 400,
                    }}
                  >
                    {day}
                  </span>

                  {/* Live badge */}
                  {liveInfo && (
                    <div
                      className="mt-auto rounded-sm px-1.5 py-1.5 hidden sm:flex flex-col gap-0.5"
                      style={{ background: `${liveInfo.accent}1A`, borderLeft: `2px solid ${liveInfo.accent}` }}
                    >
                      <span className="font-inter text-[8px] font-semibold leading-tight" style={{ color: "var(--text-dark)" }}>
                        {liveInfo.title}
                      </span>
                      <span className="font-inter text-[8px] leading-tight" style={{ color: "var(--text-light)" }}>
                        {liveInfo.time}
                      </span>
                    </div>
                  )}
                  {/* Mobile dot */}
                  {liveInfo && (
                    <div className="mt-auto sm:hidden flex justify-center">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: liveInfo.accent }} />
                    </div>
                  )}

                  {/* Tooltip */}
                  {liveInfo && hovered === idx && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 p-4 shadow-xl pointer-events-none"
                      style={{ background: "var(--bg-card)", border: `1px solid ${liveInfo.accent}50` }}
                    >
                      <p className="font-inter text-[9px] tracking-[0.3em] uppercase mb-1.5" style={{ color: "var(--gold)" }}>
                        {liveInfo.status === "LIVE" ? "🔴 Live Now" : "Facebook Live"}
                      </p>
                      <p className="font-playfair text-base leading-tight mb-1" style={{ color: "var(--text-dark)" }}>
                        {liveInfo.title}
                      </p>
                      <p className="font-inter text-[10px]" style={{ color: "var(--text-light)" }}>
                        {liveInfo.time}
                      </p>
                      {liveInfo.permalink && (
                        <a
                          href={liveInfo.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-inter text-[9px] underline mt-2 block pointer-events-auto"
                          style={{ color: "var(--gold)" }}
                        >
                          View on Facebook →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend — only shown when there are events this month */}
      {legendEvents.length > 0 && (
        <div className="px-8 py-5 border-t flex flex-wrap gap-5" style={{ borderColor: "rgba(155,99,53,0.08)", background: "var(--bg-section)" }}>
          {legendEvents.map((ev) => (
            <div key={ev.title} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ev.accent }} />
              <span className="font-inter text-[9px] tracking-wide" style={{ color: "var(--text-mid)" }}>
                {ev.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const howItWorks = [
  { step: "01", title: "Follow Our Page",    desc: "Follow Westra on Facebook or Instagram to get notified when we go live." },
  { step: "02", title: "Join the Live",       desc: "Tune in at the scheduled time. Watch us showcase each piece up close in real light." },
  { step: "03", title: "Comment to Claim",    desc: "Type 'Mine' or your size in the comments to claim a piece during the live." },
  { step: "04", title: "Confirm on WhatsApp", desc: "We'll reach out on WhatsApp to confirm your order, measurements, and delivery." },
];

// ── Page ────────────────────────────────────────────────────────────

export default function LiveSalesPage() {
  const [events, setEvents] = useState<Map<string, CalendarEvent>>(new Map());

  useEffect(() => {
    fetch(`${BASE}/social/facebook/lives`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((lives: FBLive[]) => setEvents(buildCalendarMap(lives)))
      .catch(() => setEvents(new Map())); // empty on error — no fallback
  }, []);

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── Hero — Calendar Centrepiece ───────────────── */}
      <section
        className="relative overflow-hidden pt-24 pb-0"
        style={{ background: "var(--bg-section)" }}
      >
        {/* Dot grid bg */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(var(--gold) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Top label row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 pt-14 mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"
            />
            <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-inter text-[9px] tracking-[0.5em] uppercase" style={{ color: "var(--gold)" }}>
              Facebook Live Shopping
            </span>
          </motion.div>

          {/* Big headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <h1
                className="font-playfair leading-[0.9]"
                style={{ fontSize: "clamp(52px, 8vw, 130px)", color: "var(--text-dark)", letterSpacing: "-0.02em" }}
              >
                Shop
                <br />
                <em style={{ color: "var(--gold)" }}>Live</em>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex flex-col gap-6 justify-end pb-2"
            >
              <p className="font-cormorant text-xl md:text-2xl italic leading-relaxed" style={{ color: "var(--text-mid)" }}>
                Real-time fashion discovery — no filters, no delays. Just beautiful clothes and genuine conversations.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/share/1BWf44pd5s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-3 bg-gold-gradient text-white font-inter text-[10px] tracking-[0.25em] uppercase"
                >
                  <FaFacebook size={12} /> Watch on Facebook <FaArrowRight size={10} />
                </a>
                <a
                  href="https://www.instagram.com/westra_wear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-instagram inline-flex items-center gap-2 px-7 py-3 font-inter text-[10px] tracking-[0.25em] uppercase"
                  style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-mid)" }}
                >
                  <FaInstagram size={12} /> Instagram
                </a>
              </div>
            </motion.div>
          </div>

          {/* Calendar — flush with section bottom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <LiveCalendar events={events} />
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 md:mb-16"
          >
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>
              Process
            </p>
            <h2
              className="font-playfair text-5xl md:text-6xl"
              style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}
            >
              Shop Live in 4 Steps
            </h2>
          </motion.div>

          {/* Editorial list */}
          <div className="flex flex-col">
            {howItWorks.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-12 gap-8 py-10 border-t items-start cursor-default"
                style={{ borderColor: "rgba(155,99,53,0.12)" }}
              >
                <div className="col-span-1">
                  <span className="font-inter text-xs" style={{ color: "var(--text-light)" }}>{s.step}</span>
                </div>
                <div className="col-span-11 md:col-span-4">
                  <h3
                    className="font-playfair text-2xl md:text-3xl group-hover:text-[var(--gold)]"
                    style={{ color: "var(--text-dark)", transition: "color 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                  >
                    {s.title}
                  </h3>
                </div>
                <div className="col-span-11 md:col-span-7 md:col-start-6">
                  <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
            <div className="border-t" style={{ borderColor: "rgba(155,99,53,0.12)" }} />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4"
            >
              <p className="font-inter text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: "var(--gold)" }}>Questions</p>
              <h2 className="font-playfair text-4xl md:text-5xl mb-6" style={{ color: "var(--text-dark)", letterSpacing: "-0.02em" }}>FAQs</h2>
              <div className="flex flex-col gap-4 mt-10">
                <a
                  href="https://www.facebook.com/share/1BWf44pd5s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-3 bg-gold-gradient text-white font-inter text-[10px] tracking-[0.25em] uppercase self-start"
                >
                  <FaFacebook size={12} /> Follow &amp; Get Notified
                </a>
                <a
                  href="https://wa.me/917501182583"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex items-center gap-2 px-7 py-3 font-inter text-[10px] tracking-[0.25em] uppercase self-start"
                  style={{ border: "1px solid rgba(155,99,53,0.35)", color: "var(--text-dark)" }}
                >
                  <FaWhatsapp size={12} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            <div className="lg:col-span-8 flex flex-col">
              {[
                { q: "How do I order during a live session?", a: "Simply comment the name of the piece and your size in the comments. Our team will reach out via WhatsApp within minutes to confirm your order." },
                { q: "Do you ship across India?", a: "Yes! We ship to all major cities and towns. Delivery typically takes 3–7 business days depending on your location." },
                { q: "Can I order if I miss the live?", a: "Absolutely. Message us on WhatsApp or Instagram DM and we'll check if your chosen piece is still available." },
                { q: "What payment methods do you accept?", a: "We accept UPI, bank transfer, and cash on delivery for select locations. Full details shared during order confirmation." },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="py-8 border-t"
                  style={{ borderColor: "rgba(155,99,53,0.12)" }}
                >
                  <h4 className="font-playfair text-xl mb-3" style={{ color: "var(--text-dark)" }}>{faq.q}</h4>
                  <p className="font-inter text-sm leading-8" style={{ color: "var(--text-light)" }}>{faq.a}</p>
                </motion.div>
              ))}
              <div className="border-t" style={{ borderColor: "rgba(155,99,53,0.12)" }} />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
