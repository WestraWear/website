"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface CalendarEvent {
  title: string;
  time: string;
  accent: string;
  permalink?: string;
  status: string;
}

interface LiveCalendarProps {
  events: Map<string, CalendarEvent>;
}

export default function LiveCalendar({ events }: LiveCalendarProps) {
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

  // Unique events visible this month — for the legend
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
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, idx) => (
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
          const liveInfo  = day ? (events.get(cellKey(day)) ?? null) : null;
          const todayCell = day ? isToday(day) : false;

          return (
            <div
              key={idx}
              className="relative border-r border-b"
              style={{
                minHeight: "88px",
                borderColor: "rgba(155,99,53,0.06)",
                background: todayCell ? "rgba(155,99,53,0.05)" : undefined,
              }}
              onMouseEnter={() => (day && liveInfo ? setHovered(idx) : undefined)}
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

                  {/* Live badge — desktop */}
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

      {/* Legend — only when there are events this month */}
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
