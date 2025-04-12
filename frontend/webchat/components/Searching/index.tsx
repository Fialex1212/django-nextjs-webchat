"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { useRoomsStore } from "@/store/useRoomsStore";
import { normalizeRoomName } from "@/utils/noralizeRoomName";
import Room from "../Room";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const query = useRoomsStore((state) => state.query);
  const setQuery = useRoomsStore((state) => state.setQuery);
  const loading = useRoomsStore((state) => state.loading);
  const error = useRoomsStore((state) => state.error);
  const rooms = useRoomsStore((state) => state.rooms);
  const setRooms = useRoomsStore((state) => state.setRooms);
  const setLoading = useRoomsStore((state) => state.setLoading);
  const setError = useRoomsStore((state) => state.setError);
  const results = React.useMemo(() => {
    return rooms.filter((room) =>
      room.toLowerCase().includes(query.toLowerCase())
    );
  }, [rooms, query]);

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

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "" && searchQuery !== query) {
      setQuery(normalizeRoomName(searchQuery));
    }
  }, [searchQuery, query, setQuery]);

  if (!loading && !error && results.length === 0) {
    return <h2 className="py-2 text-[30px] text-center">No results found.</h2>;
  }

  return (
    <section className="flex flex-col h-[calc(100vh-100px)] items-center justify-start">
      <div className="container">
        <div className="results">
          <ul className="results__list flex flex-col gap-3">
            {results.map((room) => (
              <li key={room}>
                <Room room={room} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;
