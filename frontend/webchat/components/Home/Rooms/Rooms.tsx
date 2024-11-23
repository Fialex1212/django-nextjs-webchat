"use client";

import axios from "axios";
import Room from "./Room";
import { useEffect, useState } from "react";
import Tags from "./Tags";
import { useRoomsStorage } from "@/storage/useRoomsStorage";
import { Toaster } from "react-hot-toast";
import Popup from "./CreateRoom/Popup";

const Rooms = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const rooms = useRoomsStorage((state) => state.rooms);
  const setRooms = useRoomsStorage((state) => state.setRooms);
  const filteredRooms = useRoomsStorage((state) => state.filteredRooms);
  const filterRooms = useRoomsStorage((state) => state.filterRooms);

  console.log(rooms);

  const getRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/rooms/`);
      setRooms(response.data);
      filterRooms();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
    // Disable ESLint for this specific line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <main className="flex h-[calc(100vh-100px)] justify-center items-center">
        <div>Loading...</div>
      </main>
    );
  }

  if (rooms.length === 0) {
    return (
      <main className="flex h-[calc(100vh-100px)] justify-center items-center">
        <div>No rooms found</div>;
      </main>
    );
  }

  return (
    <section>
      <div className="container">
        <Toaster />
        <div className="flex gap-2">
          <Popup />
          <Tags />
        </div>
        <ul className="grid grid-cols-3 gap-4 h-fit">
          {filteredRooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Rooms;
