import { motion } from "framer-motion";
import { useFilterStore } from "@/store/useFilterStore";
import { SPACES, TIERS, STYLES, TIER_META } from "@/lib/spaces";
import { Link } from "@tanstack/react-router";

export function SpacesGrid() {
  const { tier, style, setTier, setStyle } = useFilterStore();
  const meta = TIER_META[tier];

  return (
    <section className="relative py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-[var(--brass)] mb-4">The Portfolio</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              Six spaces. <br />
              <span className="italic text-[var(--emerald-deep)]">Infinite character.</span>
            </h2>
          </div>
          <p className="max-w-md text-[var(--muted-foreground)]">
            Every commission is calibrated across four tiers and four execution methods — from rapid modular installs to fully bespoke artisanal builds.
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-6 mb-14 p-8 rounded-sm border border-[var(--brass)]/30 bg-[var(--card)]/60 backdrop-blur shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-3">Tier</p>
            <div className="flex flex-wrap gap-2">
              {TIERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all ${
                    tier === t
                      ? "bg-[var(--emerald-deep)] text-[var(--ivory)] border-[var(--emerald-deep)]"
                      : "border-[var(--border)] text-[var(--ink)]/70 hover:border-[var(--brass)]"
                  }`}
                >{t}</button>
              ))}
            </div>
            <p className="text-xs mt-3 text-[var(--muted-foreground)] italic">
              {meta.tagline} · <span className="text-[var(--brass)] not-italic">{meta.range}</span>
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-3">Execution</p>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all ${
                    style === s
                      ? "bg-[var(--brass)] text-[var(--ivory)] border-[var(--brass)]"
                      : "border-[var(--border)] text-[var(--ink)]/70 hover:border-[var(--emerald-deep)]"
                  }`}
                >{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPACES.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.65, 0, 0.35, 1] }}
              className="group relative overflow-hidden rounded-sm bg-[var(--card)] shadow-soft hover:shadow-luxe transition-shadow duration-700"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-[var(--ivory)]/90 text-[var(--emerald-deep)] rounded-full">{tier}</span>
                  <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-[var(--brass)]/90 text-[var(--ivory)] rounded-full">{style}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-[var(--ivory)]">
                  <h3 className="font-display text-3xl mb-2">{s.name}</h3>
                  <p className="text-sm text-[var(--ivory)]/80 line-clamp-2">{s.blurb}</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted-foreground)] mb-4">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-1.5"><span className="w-1 h-1 bg-[var(--brass)] rounded-full" />{h}</li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[var(--emerald-deep)] hover:text-[var(--brass)] transition-colors"
                >
                  Enquire <span>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
