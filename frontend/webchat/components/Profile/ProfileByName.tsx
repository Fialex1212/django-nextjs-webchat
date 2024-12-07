"use client";

import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

const ProfileByName = ({ username }: { username: string }) => {
  const [userData, setUserData] = useState<{
    id: number;
    username: string;
    email: string; 
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async (username: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/${username}/`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      getUserData(username);
    }
  }, [username]);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>User not found.</p>;
  }

  const { email } = userData;

  return (
    <section>
      <div className="container">
        <Card className="py-4 px-6 flex gap-4 relative mb-4">
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div className="user__info flex flex-col justify-center">
            <h2 className="text-[32px]">{username}</h2>
            <p className="text-[20px]">{email}</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProfileByName;
