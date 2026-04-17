import { createFileRoute } from "@tanstack/react-router";
import { ConsultationForm } from "@/components/ConsultationForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Interio Sphere" },
      { name: "description", content: "Commission an Interio Sphere project. Tell us about your hotel and our principal designer will respond within 48 hours." },
      { property: "og:title", content: "Contact · Interio Sphere" },
      { property: "og:description", content: "Commission a project with our atelier." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="pt-40 pb-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--brass)] mb-4">Begin the Conversation</p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            A single <span className="italic text-[var(--emerald-deep)]">whisper.</span>
          </h1>
          <p className="mt-6 text-[var(--muted-foreground)] max-w-xl mx-auto text-lg">
            Tell us about your property. Our principal designer will respond personally, within 48 hours.
          </p>
        </div>
        <ConsultationForm />
      </div>
    </section>
  );
}
