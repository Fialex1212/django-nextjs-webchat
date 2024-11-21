"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface User {
  id: string;
  username: string;
}

interface Room {
  id: string;
  name: string;
  is_private: boolean;
  created_at: string;
  created_by: string;
  allowed_users: User[];
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
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
    <main className="flex h-[calc(100vh-100px)] justify-center items-center">
      <ul className="flex flex-col gap-4 h-fit">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardContent className="p-10">
              <li className="">
                <div>{room.name}</div>
                <div>Is Private: {room.is_private ? "Yes" : "No"}</div>
                <div>
                  Created:{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(room.created_at))}
                </div>
                <ul className="flex gap-4">
                  {room.allowed_users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                  ))}
                </ul>
                <Button>
                  <Link href={`http://localhost:3000/room/${room.name}/`}>
                    Connect
                  </Link>
                </Button>
              </li>
            </CardContent>
          </Card>
        ))}
      </ul>
    </main>
  );
};

export default Rooms;
