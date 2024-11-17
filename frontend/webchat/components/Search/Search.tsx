"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

const Search = () => {
  const [results, setResults] = useState({ users: [], rooms: [] });
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const getSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search/?q=${searchQuery}`
      );
      console.log(response.data);
      setResults(response.data);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [searchQuery]);

  return (
    <section className="flex flex-col h-[calc(100vh-100px)] items-center justify-start">
      <div className="container">
        //TODO add buttons like users, rooms that will be filtered by type
        <div className="users">
          {results.users.length > 0 ? (
            <h2 className="users__title py-2 text-[30px] text-center">Users</h2>
          ) : (
            <h2 className="users__title py-2 text-[30px] text-center">
              No users was found
            </h2>
          )}
          <ul className="users__list flex flex-col gap-3">
            {results.users.map((user) => (
              <li className="users__item" key={user.id}>
                <Link href={`/profile/${user.id}`}>
                  <Card className="flex items-center">
                    <CardContent className="py-4 text-[20px]">
                      {user.username}
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rooms ">
          {results.rooms.length > 0 ? (
            <h2 className="rooms__title py-2 text-[30px] text-center">Rooms</h2>
          ) : (
            <h2 className="rooms__title py-2 text-[30px] text-center">
              No rooms was found
            </h2>
          )}
          <ul className="rooms__list  flex flex-col gap-3">
            {results.rooms.map((room) => (
              <li className="rooms__item" key={room.id}>
                <Link href={`/room/${room.id}`}>
                  <Card className="flex items-center">
                    <CardContent className="py-4 text-[20px]">
                      {room.name}
                    </CardContent>{" "}
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;
