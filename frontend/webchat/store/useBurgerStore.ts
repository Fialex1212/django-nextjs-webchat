import { create } from "zustand";

interface BurgerProps {
  isOpen: boolean;
  toggleBurger: () => void;
}

const useBurgerStore = create<BurgerProps>((set) => ({
  isOpen: false,
  toggleBurger: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useBurgerStore;
