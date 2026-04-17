import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "The Process · Interio Sphere" },
      { name: "description", content: "Five stages — Listen, Conceive, Render, Craft, Reveal — that take your hotel from blueprint to soul-stirring sanctuary." },
      { property: "og:title", content: "The Process · Interio Sphere" },
      { property: "og:description", content: "Five stages from listening to revealing." },
    ],
  }),
  component: ProcessPage,
});

const STEPS = [
  { n: "01", t: "Listen", d: "We meet you on site, walk the bones of the property, and listen to your guests' future stories." },
  { n: "02", t: "Conceive", d: "Mood architectures, material libraries, and three distinct directions — each rendered in full atmosphere." },
  { n: "03", t: "Render", d: "Photoreal walkthroughs and live VR scenes, so the space is lived in long before construction begins." },
  { n: "04", t: "Craft", d: "Karigars in Jaipur, weavers in Varanasi, brass-smiths in Moradabad. Every element commissioned, never bought." },
  { n: "05", t: "Reveal", d: "We dress the room, light the candle, and step back. Your sanctuary is ready to receive its first guest." },
];

function ProcessPage() {
  return (
    <>
      <section className="pt-40 pb-20 px-6 lg:px-10 text-center">
        <p className="uppercase tracking-[0.4em] text-xs text-[var(--brass)] mb-4">The Method</p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-5xl mx-auto">
          Five stages. <br /><span className="italic text-gradient-brass">One sanctuary.</span>
        </h1>
      </section>

      <section className="pb-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto space-y-2">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
              className="group grid md:grid-cols-12 gap-6 py-10 border-t border-[var(--border)] hover:border-[var(--brass)] transition-colors"
            >
              <div className="md:col-span-2 font-display text-5xl text-[var(--brass)] group-hover:text-[var(--emerald-deep)] transition-colors">{s.n}</div>
              <h3 className="md:col-span-3 font-display text-4xl">{s.t}</h3>
              <p className="md:col-span-7 text-[var(--muted-foreground)] text-lg leading-relaxed self-center">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
