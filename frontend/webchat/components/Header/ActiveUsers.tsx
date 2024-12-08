"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveUsers = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchActiveUsersCount = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/rooms/count-active-users/"
        );
        setUserCount(response.data["Total active users"]);
      } catch (error) {
        console.error("Error fetching active user count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUsersCount();

    const intervalId = setInterval(fetchActiveUsersCount, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center ">
      <div
        className=" h-2 w-2 rounded-full my-1 bg-green-500"
      ></div>
      <p>Online {userCount}</p>
    </div>
  );
};

export default ActiveUsers;
