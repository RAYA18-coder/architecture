import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TIERS, STYLES, SPACES } from "@/lib/spaces";
import { motion } from "framer-motion";

const BUDGETS = ["Under ₹1 Cr", "₹1–5 Cr", "₹5–25 Cr", "₹25 Cr+"];

export function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || "") || null,
      project_type: String(fd.get("project_type") || ""),
      tier: String(fd.get("tier") || ""),
      style: String(fd.get("style") || "") || null,
      budget_range: String(fd.get("budget") || "") || null,
      message: String(fd.get("message") || "") || null,
    };
    if (!payload.name || !payload.email || !payload.project_type || !payload.tier) {
      setError("Please complete the required fields.");
      setStatus("error");
      return;
    }
    const { error: dbErr } = await supabase.from("inquiries").insert(payload);
    if (dbErr) {
      setError(dbErr.message);
      setStatus("error");
      return;
    }
    setStatus("success");
    (e.currentTarget as HTMLFormElement).reset();
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 rounded-sm border border-[var(--brass)]/40 bg-[var(--card)] text-center shadow-luxe"
      >
        <div className="brass-divider mb-8" />
        <h3 className="font-display text-4xl mb-4 text-[var(--emerald-deep)]">Thank you.</h3>
        <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
          Your enquiry has reached the atelier. Our principal designer will respond within 48 hours with a curated proposal.
        </p>
        <button onClick={() => setStatus("idle")} className="mt-8 text-sm uppercase tracking-[0.2em] text-[var(--brass)] hover:text-[var(--emerald-deep)]">
          Submit another →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5 p-8 md:p-12 rounded-sm border border-[var(--brass)]/30 bg-[var(--card)] shadow-luxe">
      <Field label="Name *" name="name" required />
      <Field label="Email *" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />
      <Select label="Space *" name="project_type" required options={SPACES.map((s) => s.name)} />
      <Select label="Tier *" name="tier" required options={TIERS as unknown as string[]} />
      <Select label="Style" name="style" options={STYLES as unknown as string[]} />
      <Select label="Budget" name="budget" options={BUDGETS} className="md:col-span-2" />
      <div className="md:col-span-2">
        <label className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-2">Vision</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about the property, location, and aspirations…"
          className="w-full px-4 py-3 bg-transparent border border-[var(--border)] focus:border-[var(--brass)] rounded-sm outline-none transition-colors resize-none"
        />
      </div>
      {error && <p className="md:col-span-2 text-sm text-[var(--destructive)]">{error}</p>}
      <div className="md:col-span-2 flex items-center justify-between gap-6 pt-2">
        <p className="text-xs text-[var(--muted-foreground)] italic">By submitting, you agree to be contacted by our atelier team.</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative overflow-hidden px-8 py-4 bg-[var(--emerald-deep)] text-[var(--ivory)] uppercase text-sm tracking-[0.25em] disabled:opacity-60"
        >
          <span className="relative z-10">{status === "submitting" ? "Sending…" : "Request Consultation"}</span>
          <span className="absolute inset-0 bg-[var(--brass)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="absolute inset-0 z-10 group-hover:translate-y-0 translate-y-0 flex items-center justify-center pointer-events-none" />
        </button>
      </div>
    </form>
  );
}

function Field(props: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-2">{props.label}</label>
      <input
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        className="w-full px-4 py-3 bg-transparent border border-[var(--border)] focus:border-[var(--brass)] rounded-sm outline-none transition-colors"
      />
    </div>
  );
}

function Select({ label, name, options, required, className }: { label: string; name: string; options: string[]; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-2">{label}</label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full px-4 py-3 bg-transparent border border-[var(--border)] focus:border-[var(--brass)] rounded-sm outline-none transition-colors"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
