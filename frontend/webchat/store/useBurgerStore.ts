import { create } from "zustand";

interface BurgerProps {
  isOpen: boolean;
  toggleBurger: () => void;
  closeMenu: () => void;
}

const useBurgerStore = create<BurgerProps>((set) => ({
  isOpen: false,
  toggleBurger: () => set((state) => ({ isOpen: !state.isOpen })),
  closeMenu: () => set({ isOpen: false }),
}));

export default useBurgerStore;
