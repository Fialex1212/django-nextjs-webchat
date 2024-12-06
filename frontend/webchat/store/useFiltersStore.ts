import { create } from "zustand";

interface FiltersProps {
  isOpen: boolean;
  toggleFilters: () => void;
}

const useFiltersStore = create<FiltersProps>((set) => ({
  isOpen: false,
  toggleFilters: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useFiltersStore;
