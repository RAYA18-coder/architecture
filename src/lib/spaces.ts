import lawn from "@/assets/space-lawn.jpg";
import hall from "@/assets/space-hall.jpg";
import restaurant from "@/assets/space-restaurant.jpg";
import bedroom from "@/assets/space-bedroom.jpg";
import spa from "@/assets/space-spa.jpg";
import lobby from "@/assets/space-lobby.jpg";

export type Tier = "Essentials" | "Premium" | "Luxury" | "Ultra Luxury";
export type Style = "Classic" | "Modular" | "Semi-Modular" | "Bespoke";

export const TIERS: Tier[] = ["Essentials", "Premium", "Luxury", "Ultra Luxury"];
export const STYLES: Style[] = ["Classic", "Modular", "Semi-Modular", "Bespoke"];

export const TIER_META: Record<Tier, { tagline: string; range: string; accent: string }> = {
  "Essentials": { tagline: "Refined foundations", range: "₹1.5K – 3K / sq ft", accent: "oklch(0.7 0.05 85)" },
  "Premium": { tagline: "Elevated craftsmanship", range: "₹3K – 6K / sq ft", accent: "oklch(0.55 0.13 160)" },
  "Luxury": { tagline: "Curated opulence", range: "₹6K – 12K / sq ft", accent: "oklch(0.72 0.12 75)" },
  "Ultra Luxury": { tagline: "Bespoke palatial", range: "₹12K+ / sq ft", accent: "oklch(0.34 0.09 158)" },
};

export interface Space {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  highlights: string[];
}

export const SPACES: Space[] = [
  { slug: "lobby", name: "Grand Lobby", image: lobby, blurb: "The first impression. Sweeping marble, towering palms, and brass chandeliers that crown the arrival.", highlights: ["Italian marble inlay", "Custom brass railings", "Statement palms"] },
  { slug: "function-hall", name: "Function Hall", image: hall, blurb: "Ballrooms scaled for state dinners and royal weddings, with acoustically tuned drapery.", highlights: ["Crystal chandeliers", "Convertible staging", "Silk wall panels"] },
  { slug: "restaurant", name: "Fine Dining", image: restaurant, blurb: "Booth-led intimacy with emerald velvet, ornate ceilings, and chef-table theatre.", highlights: ["Velvet banquettes", "Marble bar", "Curated art"] },
  { slug: "bedroom", name: "Presidential Suite", image: bedroom, blurb: "Sanctuaries layered in silk, brass, and the soft hush of palatial restraint.", highlights: ["Silk bedding", "Brass canopy", "Marble bath"] },
  { slug: "lawn", name: "Lawn & Courtyard", image: lawn, blurb: "Mughal-inspired gardens, topiary geometry, and fountains lit by hand-forged lanterns.", highlights: ["Topiary geometry", "Stone fountains", "Brass lanterns"] },
  { slug: "spa", name: "Wellness Spa", image: spa, blurb: "Marble cocoons, infinity pools, and botanicals in brass urns. A whispered cathedral.", highlights: ["Infinity pools", "Botanical pots", "Aroma sanctuaries"] },
];
