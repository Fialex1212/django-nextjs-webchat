import { create } from "zustand";

interface RoomsState {
  rooms: string[];
  loading: boolean;
  error: string | null;
  query: string;
  setRooms: (rooms: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setQuery: (query: string) => void;
  filteredRooms: () => string[];
}

export const useRoomsStore = create<RoomsState>((set, get) => ({
  rooms: [],
  loading: false,
  error: null,
  query: "",
  setRooms: (rooms) => set({ rooms }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setQuery: (query) => set({ query }),
  filteredRooms: () => {
    const { rooms, query } = get();
    return rooms.filter((room) =>
      room.toLowerCase().includes(query.toLowerCase())
    );
  },
}));
