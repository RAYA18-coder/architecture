import { createFileRoute } from "@tanstack/react-router";
import heroLobby from "@/assets/hero-lobby.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Atelier · Interio Sphere" },
      { name: "description", content: "An interior atelier born in Mumbai, designing for the world's most exceptional hotels — from Udaipur to London." },
      { property: "og:title", content: "Atelier · Interio Sphere" },
      { property: "og:description", content: "An interior atelier born in Mumbai." },
      { property: "og:image", content: heroLobby },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--brass)] mb-4">The Atelier</p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            We design <br /><span className="italic text-[var(--emerald-deep)]">for the few</span> — <br />
            who design <span className="italic text-gradient-brass">for the world.</span>
          </h1>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <img src={heroLobby} alt="Atelier lobby" loading="lazy" width={1920} height={1080} className="w-full aspect-[4/5] object-cover rounded-sm shadow-luxe" />
          </div>
          <div className="md:col-span-7 space-y-8 text-lg text-[var(--muted-foreground)] leading-relaxed">
            <p>
              Interio Sphere is a Mumbai-born interior atelier devoted to a single discipline: designing the interiors of the world's most exceptional hotels.
            </p>
            <p>
              Our principal-led studio has shaped lobbies in Udaipur, ballrooms in London, suites in Tokyo, and lawn pavilions in Marrakech — each rooted in a quiet conviction that the soul of a hotel lives not in its facade, but in the breath between its walls.
            </p>
            <p>
              We work with a curated bench of <em className="text-[var(--emerald-deep)] not-italic font-medium">karigars</em>, <em className="text-[var(--emerald-deep)] not-italic font-medium">weavers</em>, and <em className="text-[var(--emerald-deep)] not-italic font-medium">brass-smiths</em>, never with off-the-shelf catalogues. Every chandelier is forged. Every fabric is loomed. Every room, unrepeatable.
            </p>
            <div className="brass-divider" />
            <p className="font-display text-3xl text-[var(--ink)] italic">
              "A great hotel is a thousand small intimacies, set in marble."
              <span className="block text-sm not-italic mt-3 text-[var(--brass)] tracking-[0.2em] uppercase">— Aarav Mehta, Principal</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
