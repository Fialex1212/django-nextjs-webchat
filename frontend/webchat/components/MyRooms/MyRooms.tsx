"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { get } from "http";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const MyRooms = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useUserData();
  const { token } = useAuth();
  const router = useRouter();

  const filterMyRooms = (rooms) => {
    return rooms.filter((room) => room.created_by === id);
  };

  const getMyRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/rooms/`);
      console.log("Response Data:", response.data);
      response.data.forEach((room) =>
        console.log("Room created_by:", room.created_by)
      );
      const filteredRooms = filterMyRooms(response.data);
      setMyRooms(filteredRooms);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyRooms();
    const checkToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (!token) {
        router.push("/auth/sign-in");
      }
    };
    checkToken();
  }, [router, token]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <section>
      <div className="container">
        <h1>My Rooms:</h1>
        <ul className="flex flex-col gap-4 h-fit">
          {myRooms.map((room) => (
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
      </div>
    </section>
  );
};

export default MyRooms;
