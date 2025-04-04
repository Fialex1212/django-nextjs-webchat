"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { useRoomsStore } from "@/store/useRoomsStore";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { query, setQuery, filteredRooms, loading, error } = useRoomsStore();

  useEffect(() => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
    }
  }, [searchQuery, query, setQuery]);

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  const results = filteredRooms();

  return (
    <section className="flex flex-col h-[calc(100vh-100px)] items-center justify-start">
      <div className="container">
        <div className="results">
          {results.length > 0 ? (
            <ul className="results__list flex flex-col gap-3">
              {results.map((room) => (
                <li key={room}>
                  <Link href={`/room/${room}`}>
                    <Card className="flex items-center">
                      <CardContent className="py-4 text-[20px]">
                        {room}
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <h2 className="py-2 text-[30px] text-center">No results found</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
