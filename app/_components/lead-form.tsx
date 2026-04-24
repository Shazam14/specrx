"use client";

import { useEffect, useRef, useState } from "react";

type Status = { kind: "idle" | "info" | "warn" | "success" | "error"; text: string };

const IDLE: Status = { kind: "idle", text: "" };

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<number>(Date.now());
  const [status, setStatus] = useState<Status>(IDLE);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const statusColor =
    status.kind === "success"
      ? "#1f6f43"
      : status.kind === "warn" || status.kind === "error"
        ? "#9b4d2d"
        : "var(--text-body)";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const honeypot = String(data.get("website") ?? "").trim();
    const humanCheck = String(data.get("human_check") ?? "").trim();
    const fullName = String(data.get("full_name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (honeypot !== "") {
      setStatus({ kind: "error", text: "Submission blocked." });
      return;
    }

    const elapsedMs = Date.now() - startedAtRef.current;
    if (elapsedMs < 3000) {
      setStatus({ kind: "warn", text: "Please take a moment before submitting." });
      return;
    }

    if (humanCheck !== "5") {
      setStatus({ kind: "warn", text: "Please answer the quick check correctly." });
      (form.elements.namedItem("human_check") as HTMLInputElement | null)?.focus();
      return;
    }

    setSubmitting(true);
    setStatus({ kind: "info", text: "Sending your enquiry…" });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          message,
          humanCheck,
          startedAt: startedAtRef.current,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setStatus({
          kind: "error",
          text: body?.error ?? "We could not send your enquiry. Please try again.",
        });
        return;
      }

      setStatus({
        kind: "success",
        text: "Thanks, your enquiry has been received. We will reply shortly.",
      });
      form.reset();
      startedAtRef.current = Date.now();
    } catch {
      setStatus({
        kind: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      id="apollo-lead-form"
      className="lead-form"
      method="post"
      action="#"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="lead-form-grid">
        <div className="lead-field">
          <label htmlFor="lead-name">Full name *</label>
          <input id="lead-name" name="full_name" type="text" required autoComplete="name" />
        </div>
        <div className="lead-field">
          <label htmlFor="lead-email">Work email *</label>
          <input id="lead-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="lead-field" style={{ marginTop: 12 }}>
        <label htmlFor="lead-message">Message (optional)</label>
        <textarea
          id="lead-message"
          name="message"
          placeholder="Tell us about your clinic goals"
        />
      </div>
      <div className="lead-field" style={{ marginTop: 12 }}>
        <label htmlFor="human-check">Quick check: what is 2 + 3? *</label>
        <input
          id="human-check"
          name="human_check"
          type="number"
          inputMode="numeric"
          required
        />
      </div>

      <div className="honeypot-wrap" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ marginTop: 14, width: "100%" }}
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Send Enquiry"}
      </button>
      <p className="form-status" role="status" aria-live="polite" style={{ color: statusColor }}>
        {status.text}
      </p>
    </form>
  );
}
