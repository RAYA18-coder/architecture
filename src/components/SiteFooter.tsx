import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative bg-[var(--ink)] text-[var(--ivory)]/85 pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-0 grain" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[var(--emerald-deep)]/30 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] mb-6">
              Where space <br />
              <span className="text-gradient-brass italic">meets soul.</span>
            </h2>
            <p className="text-[var(--ivory)]/60 max-w-md mb-8">
              Interior design ateliers for the world's most exceptional hotels. Mumbai · Udaipur · London.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 text-[var(--brass-light)] hover:text-[var(--brass)] uppercase text-sm tracking-[0.2em]">
              Commission a project <span>→</span>
            </Link>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brass)] mb-4">Atelier</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[var(--brass-light)]">Our story</Link></li>
              <li><Link to="/process" className="hover:text-[var(--brass-light)]">The process</Link></li>
              <li><Link to="/spaces" className="hover:text-[var(--brass-light)]">Spaces</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brass)] mb-4">Contact</h4>
            <p className="text-sm leading-relaxed">
              Atelier Sphere<br />
              22 Marine Drive, Mumbai 400020<br />
              hello@interiosphere.studio<br />
              +91 22 6666 0000
            </p>
          </div>
        </div>

        <div className="brass-divider mt-16 mb-6 opacity-30" />
        <div className="flex flex-col md:flex-row justify-between text-xs text-[var(--ivory)]/40 gap-2">
          <span>© {new Date().getFullYear()} Interio Sphere. All rights reserved.</span>
          <span className="uppercase tracking-[0.3em]">Crafted in India · Cherished worldwide</span>
        </div>
      </div>
    </footer>
  );
}
