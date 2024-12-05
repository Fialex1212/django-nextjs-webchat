import {create} from "zustand";

export const useUserStorage = create((set) => ({
    user: null,
}));
