"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Check, Download } from "lucide-react";
import Link from "next/link";
import type { Slot } from "@/lib/validation";
export function EnquiryForm({
  interest = "Farm project",
  slot,
  live = false,
}: {
  interest?: string;
  slot?: Slot;
  live?: boolean;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "preview" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const requestId = useRef("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const fields = new FormData(e.currentTarget);
    const payload = {
      name: String(fields.get("name") || ""),
      email: String(fields.get("email") || ""),
      phone: String(fields.get("phone") || ""),
      organisation: String(fields.get("organisation") || ""),
      location: String(fields.get("location") || ""),
      budget: String(fields.get("budget") || ""),
      interest: String(fields.get("interest") || interest),
      message: String(fields.get("message") || ""),
      consent: fields.get("consent") === "on",
      website: String(fields.get("website") || ""),
      requestId: requestId.current,
      ...(slot ? { slotId: slot.id, consultationType: slot.type } : {}),
    };
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Unable to send your request.");
      setMessage(result.message);
      setDraft({
        ...payload,
        selectedSlot: slot || null,
        deliveryStatus: result.mode === "preview" ? "not-sent" : "received",
        createdAt: new Date().toISOString(),
      });
      setStatus(result.mode === "preview" ? "preview" : "success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Please try again.");
      setStatus("error");
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "dekoraj-project-enquiry.json";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }
  if (status === "preview" || status === "success")
    return (
      <div className="form-result" role="status">
        <span className="result-icon">
          <Check />
        </span>
        <span className="section-label">
          {status === "preview" ? "Preview complete" : "Enquiry received"}
        </span>
        <h2>
          {status === "preview"
            ? "YOUR BRIEF IS READY."
            : "LET’S TAKE THE NEXT STEP."}
        </h2>
        <p>{message}</p>
        {status === "preview" && (
          <button className="arrow-link solid" onClick={download}>
            Download your enquiry <Download size={18} />
          </button>
        )}
        <button
          className="plain-button"
          onClick={() => {
            setStatus("idle");
            requestId.current = "";
          }}
        >
          Prepare another enquiry
        </button>
      </div>
    );
  return (
    <form className="enquiry-form" onSubmit={submit}>
      {!live && (
        <div className="preview-notice">
          <span>Interactive preview</span> This preview validates your request
          without storing it or delivering it to Dekoraj. You can download a
          copy.
        </div>
      )}
      <div className="form-grid">
        <label>
          Full name <span>*</span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
          />
        </label>
        <label>
          Phone number
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
        <label>
          Company / organisation
          <input
            name="organisation"
            maxLength={150}
            autoComplete="organization"
          />
        </label>
        <label>
          Interested in <span>*</span>
          <input
            name="interest"
            defaultValue={interest}
            required
            minLength={2}
            maxLength={120}
          />
        </label>
        <label>
          Project location
          <input
            name="location"
            maxLength={200}
            autoComplete="address-level1"
          />
        </label>
      </div>
      <label>
        Indicative budget
        <select name="budget" defaultValue="">
          <option value="">Prefer to discuss</option>
          <option>Under ₦5 million</option>
          <option>₦5–25 million</option>
          <option>₦25–100 million</option>
          <option>Above ₦100 million</option>
        </select>
      </label>
      <label>
        Tell us what you’re building <span>*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="Your idea, intended capacity, location, timeline and what you need help with…"
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to the use of these details to respond to my enquiry, as
          described in the <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {status === "error" && (
        <p className="form-error" role="alert">
          {message}
        </p>
      )}
      <button
        type="submit"
        className="arrow-link solid"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? "Preparing your request…"
          : live
            ? "Send enquiry"
            : "Prepare enquiry"}
        <ArrowUpRight size={18} />
      </button>
      <p className="small-note">
        {slot
          ? "This is a consultation request. A selected time is not reserved until confirmed by the team."
          : "No payment is taken through this form."}
      </p>
    </form>
  );
}
