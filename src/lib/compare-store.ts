import { create } from "zustand";
import { persist } from "zustand/middleware";

type CompareState = {
  ids: string[];
  toggle: (id: string) => void;
  clear: () => void;
};

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const cur = get().ids;
        if (cur.includes(id)) {
          set({ ids: cur.filter((x) => x !== id) });
          return;
        }
        if (cur.length >= 3) {
          set({ ids: [...cur.slice(1), id] });
          return;
        }
        set({ ids: [...cur, id] });
      },
      clear: () => set({ ids: [] }),
    }),
    { name: "ad-compare" },
  ),
);
