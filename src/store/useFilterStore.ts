import { create } from "zustand";
import type { Tier, Style } from "@/lib/spaces";

interface FilterState {
  tier: Tier;
  style: Style;
  setTier: (t: Tier) => void;
  setStyle: (s: Style) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  tier: "Luxury",
  style: "Bespoke",
  setTier: (tier) => set({ tier }),
  setStyle: (style) => set({ style }),
}));
