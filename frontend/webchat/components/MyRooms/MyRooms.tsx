"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

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
    if (token) {
        router.push("/");
      }
  }, [id, token, router]);

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
        <ul>
          {myRooms.map((room) => (
            <li key={room.id}>
              <h1>{room.name}</h1>
              <p>{room.created_by}</p>
              <p>{room.created_at}</p>
              <p>{room.id}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MyRooms;
