import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

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

const Room: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <Card>
      <CardContent className="px-8 py-6">
        <li>
          <h4 className="text-[24px]">{room.name}</h4>
          <p>{room.is_private ? "Private" : "Public"}</p>
          <p className="flex gap-1 mb-2">
            Created:
            <p>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(room.created_at))}
            </p>
          </p>
          <Button className="w-full text-salate-50">
            <Link
              className="w-full h-full text-slate-50"
              href={`http://localhost:3000/room/${room.name}/`}
            >
              Connect
            </Link>
          </Button>
        </li>
      </CardContent>
    </Card>
  );
};

export default Room;
