import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero3D } from "@/components/Hero3D";
import { SpacesGrid } from "@/components/SpacesGrid";
import heroLobby from "@/assets/hero-lobby.jpg";
import { TIERS, TIER_META } from "@/lib/spaces";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interio Sphere — Where Space Meets Soul" },
      { name: "description", content: "Bespoke interior design for 7-star hotels: Oberoi-grade lobbies, palatial function halls, fine-dining restaurants, presidential suites, lawns and spas." },
      { property: "og:title", content: "Interio Sphere — Where Space Meets Soul" },
      { property: "og:description", content: "Bespoke interior design ateliers for the world's most exceptional hotels." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const wordsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50, ease: "none", duration: 30, repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={heroLobby} alt="Luxury hotel lobby" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[var(--ivory)]/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ivory)]/20 via-transparent to-[var(--ivory)]" />
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none">
          <Hero3D />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.4em] text-[var(--brass)] mb-6"
            >
              Atelier · Est. Mumbai
            </motion.p>
            <div ref={wordsRef} className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] text-[var(--ink)]">
              {["Where", "space", "meets"].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
                  className="block"
                >{w}</motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                className="block italic text-gradient-brass"
              >soul.</motion.span>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-8 max-w-md text-[var(--ink)]/70 text-lg leading-relaxed"
            >
              Interio Sphere designs interiors for the world's most exceptional 7-star hotels — from sweeping lobbies to whispered spa sanctuaries.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/spaces" className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--emerald-deep)] text-[var(--ivory)] uppercase text-sm tracking-[0.25em] relative overflow-hidden">
                <span className="relative z-10">Explore spaces</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-[var(--brass)] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 absolute inset-0 flex items-center justify-center" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--ink)]/30 hover:border-[var(--brass)] uppercase text-sm tracking-[0.25em] text-[var(--ink)] transition-colors">
                Begin a project
              </Link>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[var(--ink)]/50"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--brass)] to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="py-12 bg-[var(--ink)] text-[var(--ivory)] overflow-hidden border-y border-[var(--brass)]/30">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-16 font-display text-3xl md:text-5xl">
          {Array.from({ length: 2 }).flatMap((_, k) => [
            "Oberoi-grade craft",
            "Bespoke palatial",
            "Mughal geometry",
            "Velvet & marble",
            "Brass-forged",
            "Where space meets soul",
          ].map((t, i) => (
            <span key={`${k}-${i}`} className="flex items-center gap-16">
              <span className="italic text-gradient-brass">{t}</span>
              <span className="text-[var(--brass)]/40">✦</span>
            </span>
          )))}
        </div>
      </section>

      {/* TIERS */}
      <section className="relative py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up max-w-3xl mb-20">
            <p className="uppercase tracking-[0.3em] text-xs text-[var(--brass)] mb-4">Four tiers · One philosophy</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              From <span className="italic text-[var(--emerald-deep)]">essentials</span> to the <span className="italic text-gradient-brass">unrepeatable.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t, i) => {
              const m = TIER_META[t];
              return (
                <div
                  key={t}
                  className="reveal-up group relative p-8 rounded-sm border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brass)] transition-all duration-500 hover:-translate-y-2 hover:shadow-luxe overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: m.accent }} />
                  <span className="text-xs text-[var(--muted-foreground)]">0{i + 1}</span>
                  <h3 className="font-display text-3xl mt-3 mb-2">{t}</h3>
                  <p className="italic text-sm text-[var(--brass)] mb-4">{m.tagline}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{m.range}</p>
                  <div className="mt-6 brass-divider opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPACES */}
      <SpacesGrid />

      {/* CTA */}
      <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-emerald" />
        <div className="absolute inset-0 grain" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--brass)]/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[var(--brass)]/20 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="relative max-w-4xl mx-auto text-center text-[var(--ivory)]">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--brass-light)] mb-6">A private commission</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8">
            Let us design <br /><span className="italic text-gradient-brass">your sanctuary.</span>
          </h2>
          <p className="max-w-xl mx-auto text-[var(--ivory)]/75 mb-10 text-lg">
            Each project begins with a single conversation. Tell us about your property, your guests, and the soul you wish to evoke.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--ivory)] text-[var(--emerald-deep)] uppercase text-sm tracking-[0.3em] hover:bg-[var(--brass)] hover:text-[var(--ivory)] transition-all duration-500 shadow-brass"
          >
            Begin the conversation <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
