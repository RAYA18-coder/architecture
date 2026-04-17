import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/spaces", label: "Spaces" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--ivory)]/85 backdrop-blur-xl border-b border-[var(--brass)]/20 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-[var(--emerald-deep)]">INTERIO</span>
          <span className="font-display text-2xl tracking-tight text-gradient-brass italic">SPHERE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2 text-sm tracking-wide uppercase text-[var(--ink)]/70 hover:text-[var(--emerald-deep)] transition-colors relative"
              activeProps={{ className: "px-4 py-2 text-sm tracking-wide uppercase text-[var(--emerald-deep)] font-medium" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--brass)] text-sm uppercase tracking-wider text-[var(--emerald-deep)] hover:bg-[var(--brass)] hover:text-[var(--ivory)] transition-all duration-500"
        >
          Begin a project <span aria-hidden>→</span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[var(--emerald-deep)]"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-px bg-current mb-1.5" />
          <div className="w-6 h-px bg-current mb-1.5" />
          <div className="w-6 h-px bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--ivory)]/95 backdrop-blur-xl border-t border-[var(--brass)]/20">
          <div className="px-6 py-6 flex flex-col gap-2">
            {NAV.map((i) => (
              <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="py-3 uppercase tracking-wider text-sm text-[var(--ink)]">
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
