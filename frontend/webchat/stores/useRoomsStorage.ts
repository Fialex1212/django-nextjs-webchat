import { create } from "zustand";

interface RoomStore {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  rooms: any[];
  setRooms: (rooms: any[]) => void;
  filteredRooms: any[];
  filterRooms: () => void;
}

export const useRoomsStorage = create<RoomStore>((set, get) => ({
  selectedTags: [],
  setSelectedTags: (tags) => {
    set({ selectedTags: tags });
    get().filterRooms();
  },
  rooms: [],
  setRooms: (rooms) => {
    set({ rooms });
    get().filterRooms();
  },
  filteredRooms: [],
  filterRooms: () => {
    const { rooms, selectedTags } = get();
  
    const filtered = selectedTags.length
      ? rooms.filter((room) =>
          selectedTags.every((tag) =>
            room.tags && room.tags.some((roomTag) => roomTag.name === tag)
          )
        )
      : rooms;
  
    set({ filteredRooms: filtered });
  },
}));
