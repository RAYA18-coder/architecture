import { createFileRoute } from "@tanstack/react-router";
import { SpacesGrid } from "@/components/SpacesGrid";

export const Route = createFileRoute("/spaces")({
  head: () => ({
    meta: [
      { title: "Spaces · Interio Sphere" },
      { name: "description", content: "Lobbies, function halls, restaurants, suites, lawns and spas — designed across four tiers and four execution methods for 7-star hotels." },
      { property: "og:title", content: "Spaces · Interio Sphere" },
      { property: "og:description", content: "Six signature spaces. Four tiers. Four execution methods." },
    ],
  }),
  component: SpacesPage,
});

function SpacesPage() {
  return (
    <>
      <section className="pt-40 pb-12 px-6 lg:px-10 text-center">
        <p className="uppercase tracking-[0.4em] text-xs text-[var(--brass)] mb-4">The Portfolio</p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-5xl mx-auto">
          Every space, <span className="italic text-[var(--emerald-deep)]">a story</span> waiting to be told.
        </h1>
      </section>
      <SpacesGrid />
    </>
  );
}
