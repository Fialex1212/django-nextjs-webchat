import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  username: string;
}

interface Room {
  id: string;
  name: string;
}

interface SearchItem {
  id: string;
  name: string;
  type: "user" | "room";
}

interface SearchState {
  query: string;
  searchResults: {
    users: User[];
    rooms: Room[];
  };
  results: SearchItem[];
  isLoading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  getData: () => Promise<void>;
  setResults: () => void;
  clearData: () => void;
}

const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  searchResults: {
    users: [],
    rooms: [],
  },
  results: [],
  isLoading: false,
  error: null,
  setQuery: (query: string) => set({ query }),
  setResults: () => {
    const { searchResults } = get();
    set({
      results: [
        ...searchResults.users.map((user) => ({
          id: user.id,
          name: user.username,
          type: "user",
        })),
        ...searchResults.rooms.map((room) => ({
          id: room.id,
          name: room.name,
          type: "room",
        })),
      ],
    });
  },
  getData: async () => {
    const { query } = get();
    set({ isLoading: true, error: null, searchResults: { users: [], rooms: [] }, results: [] });

    try {
      const response = await axios.get(`http://localhost:8000/api/search/?q=${query}`);
      const data = await response.data;
      set({
        searchResults: data,
        isLoading: false,
      });
      get().setResults();
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch search results" });
    }
  },

  clearData: () => set({ results: [] }),
}));

export default useSearchStore;
