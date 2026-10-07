"use client";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import { consultationTypes } from "@/lib/content";
import { EnquiryForm } from "./enquiry-form";
import type { Slot } from "@/lib/validation";
function dateKey(d: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}
export function Booking({
  initialType = "online",
  live = false,
}: {
  initialType?: string;
  live?: boolean;
}) {
  const [type, setType] = useState(initialType);
  const [month, setMonth] = useState<Date | null>(null);
  const [data, setData] = useState<{ mode: string; slots: Slot[] } | null>(
    null,
  );
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [step, setStep] = useState(1);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const now = new Date();
    setMonth(new Date(`${dateKey(now).slice(0, 7)}-01T12:00:00Z`));
    const controller = new AbortController();
    fetch("/api/availability", { signal: controller.signal })
      .then(async (r) => {
        const result = await r.json();
        if (!r.ok) throw new Error(result.error);
        setData(result);
        setError("");
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(e.message || "Could not load availability.");
      });
    return () => controller.abort();
  }, [reload]);
  const filtered = data?.slots.filter((s) => s.type === type) || [];
  const days = month
    ? new Date(
        Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0),
      ).getUTCDate()
    : 0;
  const padding = month ? (month.getUTCDay() + 6) % 7 : 0;
  const monthKey = month?.toISOString().slice(0, 7);
  const times = filtered.filter((s) => dateKey(new Date(s.startsAt)) === date);
  function changeMonth(delta: number) {
    if (month) {
      setMonth(
        new Date(
          Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + delta, 1, 12),
        ),
      );
      setDate("");
      setSlot(null);
    }
  }
  return (
    <div className="booking-layout">
      <aside>
        <span className="section-label">01 / Choose your format</span>
        <div className="booking-types">
          {consultationTypes.map((c) => (
            <button
              key={c.id}
              className={type === c.id ? "selected" : ""}
              aria-pressed={type === c.id}
              onClick={() => {
                setType(c.id);
                setSlot(null);
                setDate("");
                setStep(1);
              }}
            >
              <small>{c.icon}</small>
              <span>
                <strong>{c.label}</strong>
                <span>{c.note}</span>
              </span>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <p className="small-note">
          All times are shown in West Africa Time (WAT, UTC+1). Pricing and
          duration are confirmed with the consultation details.
        </p>
      </aside>
      <div className="booking-main">
        {data?.mode === "preview" && (
          <div className="preview-notice">
            <span>Calendar preview</span> These dates and durations are
            examples, not Dekoraj’s live availability. No payment or reservation
            is made.
          </div>
        )}
        {error ? (
          <div role="alert" className="empty-state">
            <p>{error}</p>
            <button
              className="plain-button"
              onClick={() => {
                setError("");
                setReload(reload + 1);
              }}
            >
              Try again
            </button>
          </div>
        ) : !data || !month ? (
          <p role="status">Loading calendar…</p>
        ) : step === 1 ? (
          <>
            <span className="section-label">02 / Find a time</span>
            <div className="calendar-head">
              <h2>
                {month.toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </h2>
              <div>
                <button
                  aria-label="Previous month"
                  onClick={() => changeMonth(-1)}
                  disabled={monthKey! <= dateKey(new Date()).slice(0, 7)}
                >
                  <ChevronLeft size={18} />
                </button>
                <button aria-label="Next month" onClick={() => changeMonth(1)}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="calendar-grid">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span className="calendar-weekday" key={i}>
                  {d}
                </span>
              ))}
              {Array.from({ length: padding }, (_, i) => (
                <span key={`pad-${i}`} />
              ))}
              {Array.from({ length: days }, (_, i) => {
                const key = `${monthKey}-${String(i + 1).padStart(2, "0")}`;
                const available = filtered.some(
                  (s) => dateKey(new Date(s.startsAt)) === key,
                );
                return (
                  <button
                    key={key}
                    disabled={!available}
                    className={`${available ? "available" : ""} ${date === key ? "selected" : ""}`}
                    aria-pressed={date === key}
                    aria-label={`${key}${available ? ", available" : ", unavailable"}`}
                    onClick={() => {
                      setDate(key);
                      setSlot(null);
                    }}
                  >
                    {i + 1}
                    {available && <i />}
                  </button>
                );
              })}
            </div>
            <div className="calendar-legend">
              <span>
                <i /> Available
              </span>
              <span>Muted dates are unavailable</span>
            </div>
            <div className="time-slots">
              <span className="section-label">
                {date
                  ? `Available times · ${date}`
                  : "Select an available date"}
              </span>
              <div>
                {times.map((s) => (
                  <button
                    key={s.id}
                    className={slot?.id === s.id ? "selected" : ""}
                    aria-pressed={slot?.id === s.id}
                    onClick={() => setSlot(s)}
                  >
                    {new Date(s.startsAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Africa/Lagos",
                    })}
                    <small>{s.durationMinutes} min</small>
                  </button>
                ))}
              </div>
            </div>
            {filtered.length === 0 && (
              <p>
                No dates are currently available for this consultation type.
              </p>
            )}
            {slot && (
              <div className="booking-summary">
                <p>
                  {slot.feeNgn === null
                    ? "Fee: confirmed with your quotation"
                    : `Consultation fee: ₦${slot.feeNgn.toLocaleString()}`}
                  <small>Payment arrangements follow team confirmation.</small>
                </p>
                <button className="arrow-link solid" onClick={() => setStep(2)}>
                  Your details <ArrowUpRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button className="plain-button" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Change your time
            </button>
            <h2 className="details-title">
              A FEW DETAILS.
              <br />
              THEN WE BEGIN.
            </h2>
            <EnquiryForm
              interest={`${consultationTypes.find((c) => c.id === type)?.label} request`}
              slot={slot || undefined}
              live={live}
            />
          </>
        )}
      </div>
    </div>
  );
}
