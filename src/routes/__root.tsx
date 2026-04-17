import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CustomCursor } from "@/components/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-[var(--emerald-deep)]">404</h1>
        <p className="font-display italic text-2xl text-[var(--brass)] mt-2">A space yet to be designed.</p>
        <p className="mt-4 text-sm text-muted-foreground">The page you seek does not exist in our atelier.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-[var(--brass)] text-sm uppercase tracking-[0.2em] hover:bg-[var(--brass)] hover:text-[var(--ivory)] transition-colors">
          Return home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Interio Sphere — Where Space Meets Soul" },
      { name: "description", content: "Bespoke interior design ateliers for the world's most exceptional 7-star hotels. Lobbies, halls, restaurants, suites, lawns and spas across four tiers — from Essentials to Ultra Luxury." },
      { name: "author", content: "Interio Sphere" },
      { property: "og:title", content: "Interio Sphere — Where Space Meets Soul" },
      { property: "og:description", content: "Bespoke interior design for 7-star hotels. Where space meets soul." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
