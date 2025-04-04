"use client";

import { useRoomsStore } from "@/store/useRoomsStore";
import Room from "../Room";
import { useEffect } from "react";

const Rooms = () => {
  const { rooms, loading, error, setRooms, setLoading, setError } =
    useRoomsStore();

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/room_list/");

    socket.onopen = () => {
      console.log("WebScoket connected");
      socket.send("get_rooms");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type == "room_list") {
        setRooms(data.rooms);
        console.log(data.rooms);
        setLoading(false);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Failed to load rooms");
      setLoading(false);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [setRooms, setLoading, setError]);

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-465px)] justify-center items-center text-[32px]">
        <div>Loading...</div>
      </main>
    );
  }

  if (rooms?.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-465px)] justify-center items-center text-[32px]">
        <div>No rooms found</div>
      </main>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
        {rooms?.map((room) => (
          <Room key={room} room={room} />
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
