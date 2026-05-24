"use client";

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
const ACCENT_CYCLE = ["#C6A77D", "#D4BC9A", "#A5A8D4", "#B8906A", "#9B8560"];

interface FBLive {
  id: string;
  title?: string;
  status: string;
  planned_start_time?: string;
  permalink_url?: string;
}

interface CalendarEvent {
  title: string;
  time: string;
  accent: string;
  permalink?: string;
  status: string;
}

function toDateKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildCalendarMap(lives: FBLive[]): Map<string, CalendarEvent> {
  const map = new Map<string, CalendarEvent>();
  let idx = 0;
  for (const live of lives) {
    if (!live.planned_start_time) continue;
    const key = toDateKey(live.planned_start_time);
    if (!map.has(key)) {
      const d = new Date(live.planned_start_time);
      map.set(key, {
        title: live.title ?? "Westra Live",
        time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        accent: ACCENT_CYCLE[idx % ACCENT_CYCLE.length],
        permalink: live.permalink_url,
        status: live.status,
      });
      idx++;
    }
  }
  return map;
}

function Calendar({ events }: { events: Map<string, CalendarEvent> }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [hovered, setHovered] = useState<number | null>(null);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(viewDate);
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const cellKey = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const legendEvents: CalendarEvent[] = [];
  const seen = new Set<string>();
  for (let d = 1; d <= daysInMonth; d++) {
    const ev = events.get(cellKey(d));
    if (ev && !seen.has(ev.title)) { legendEvents.push(ev); seen.add(ev.title); }
  }

  return (
    <div style={{ border: "1px solid rgba(155,99,53,0.16)", background: "var(--bg-card)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: "rgba(155,99,53,0.1)", background: "var(--bg-section)" }}>
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-[rgba(155,99,53,0.1)]" style={{ color: "var(--text-mid)" }}>
          <FaChevronLeft size={11} />
        </button>
        <div className="text-center">
          <p className="font-playfair text-2xl" style={{ color: "var(--text-dark)" }}>{monthName}</p>
          <p className="font-inter text-[10px] tracking-[0.35em] uppercase mt-0.5" style={{ color: "var(--text-light)" }}>{year}</p>
        </div>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-[rgba(155,99,53,0.1)]" style={{ color: "var(--text-mid)" }}>
          <FaChevronRight size={11} />
        </button>
      </div>

      {/* DOW row */}
      <div className="grid grid-cols-7" style={{ borderBottom: "1px solid rgba(155,99,53,0.08)" }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
          <div key={d} className="py-3 text-center font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-light)", borderRight: i < 6 ? "1px solid rgba(155,99,53,0.06)" : undefined }}>{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          const ev = day ? events.get(cellKey(day)) ?? null : null;
          const tod = day ? isToday(day) : false;
          return (
            <div key={idx} className="relative border-r border-b" style={{ minHeight: "88px", borderColor: "rgba(155,99,53,0.06)", background: tod ? "rgba(155,99,53,0.05)" : undefined }}
              onMouseEnter={() => day && ev ? setHovered(idx) : undefined} onMouseLeave={() => setHovered(null)}>
              {day && (
                <div className="p-2 h-full flex flex-col">
                  <span className="font-inter text-xs self-end leading-none" style={{ color: tod ? "var(--gold)" : ev ? "var(--text-dark)" : "var(--text-light)", fontWeight: tod ? 700 : ev ? 600 : 400 }}>{day}</span>
                  {ev && (
                    <div className="mt-auto rounded-sm px-1.5 py-1.5 hidden sm:flex flex-col gap-0.5" style={{ background: `${ev.accent}1A`, borderLeft: `2px solid ${ev.accent}` }}>
                      <span className="font-inter text-[8px] font-semibold leading-tight" style={{ color: "var(--text-dark)" }}>{ev.title}</span>
                      <span className="font-inter text-[8px] leading-tight" style={{ color: "var(--text-light)" }}>{ev.time}</span>
                    </div>
                  )}
                  {ev && <div className="mt-auto sm:hidden flex justify-center"><div className="w-1.5 h-1.5 rounded-full" style={{ background: ev.accent }} /></div>}
                  {ev && hovered === idx && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 p-4 shadow-xl pointer-events-none" style={{ background: "var(--bg-card)", border: `1px solid ${ev.accent}50` }}>
                      <p className="font-inter text-[9px] tracking-[0.3em] uppercase mb-1.5" style={{ color: "var(--gold)" }}>{ev.status === "LIVE" ? "🔴 Live Now" : "Facebook Live"}</p>
                      <p className="font-playfair text-base leading-tight mb-1" style={{ color: "var(--text-dark)" }}>{ev.title}</p>
                      <p className="font-inter text-[10px]" style={{ color: "var(--text-light)" }}>{ev.time}</p>
                      {ev.permalink && <a href={ev.permalink} target="_blank" rel="noopener noreferrer" className="font-inter text-[9px] underline mt-2 block pointer-events-auto" style={{ color: "var(--gold)" }}>View on Facebook →</a>}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {legendEvents.length > 0 && (
        <div className="px-8 py-5 border-t flex flex-wrap gap-5" style={{ borderColor: "rgba(155,99,53,0.08)", background: "var(--bg-section)" }}>
          {legendEvents.map((ev) => (
            <div key={ev.title} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ev.accent }} />
              <span className="font-inter text-[9px] tracking-wide" style={{ color: "var(--text-mid)" }}>{ev.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LiveCalendarWidget({ initialLives }: { initialLives?: FBLive[] }) {
  const [events, setEvents] = useState<Map<string, CalendarEvent>>(
    initialLives ? buildCalendarMap(initialLives) : new Map()
  );

  useEffect(() => {
    if (initialLives) return;
    fetch(`${BASE}/social/facebook/lives`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((lives: FBLive[]) => setEvents(buildCalendarMap(lives)))
      .catch(() => setEvents(new Map()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Calendar events={events} />;
}
