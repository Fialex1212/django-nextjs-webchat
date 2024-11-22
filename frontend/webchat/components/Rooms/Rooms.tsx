"use client";

import axios from "axios";
import Room from "./Room";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

interface RoomData {
  id: string;
  name: string;
  is_private: boolean;
  created_at: string;
  created_by: string;
  allowed_users: User[];
}

const Rooms = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/rooms/`);
      setRooms(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  console.log(rooms);

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
        <ul className="grid grid-cols-3 gap-4 h-fit">
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Rooms;
