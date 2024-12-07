"use client";

import axios from "axios";
import Room from "./Room";
import { useEffect, useState } from "react";
import Tags from "./Tags";
import { useRoomsStorage } from "@/store/useRoomsStorage";
import { Toaster } from "react-hot-toast";
import Popup from "./CreateRoom/Popup";

const Rooms = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const rooms = useRoomsStorage((state) => state.rooms);
  const setRooms = useRoomsStorage((state) => state.setRooms);
  const filteredRooms = useRoomsStorage((state) => state.filteredRooms);
  const filterRooms = useRoomsStorage((state) => state.filterRooms);

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

  console.log(rooms);

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
      <div className="container relative">
        <Toaster />
        <div className="md:flex md:gap-2">
          <Tags />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
          {filteredRooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </ul>
        <div className="absolute top-0 md:top-auto left-[20px] md:left-auto md:bottom-[-20[px]] md:right-[20px]">
          <Popup />
        </div>
      </div>
    </section>
  );
};

export default Rooms;
