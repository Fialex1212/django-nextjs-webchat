"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useRoomsStore } from "@/store/useRoomsStore";
import { normalizeRoomName } from "@/utils/noralizeRoomName";
import Room from "../Room";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const {
    query,
    setQuery,
    loading,
    error,
    rooms,
    setRooms,
    setLoading,
    setError,
  } = useRoomsStore((state) => ({
    query: state.query,
    setQuery: state.setQuery,
    loading: state.loading,
    error: state.error,
    rooms: state.rooms,
    setRooms: state.setRooms,
    setLoading: state.setLoading,
    setError: state.setError,
  }));

  const results = React.useMemo(() => {
    return rooms.filter((room) =>
      room.toLowerCase().includes(query.toLowerCase())
    );
  }, [rooms, query]);

  useEffect(() => {
    const socket = new WebSocket("wss://127.0.0.1:8000/api/ws/room_list/");

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
