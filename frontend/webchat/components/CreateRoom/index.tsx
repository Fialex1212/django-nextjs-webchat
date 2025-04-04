"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");

  const normalizeRoomName = (name: string) => {
    return name.replace(/[^a-zA-Z0-9._-]/g, "_");
  };

  return (
    <div>
      <Card>
        <CardContent className="px-6 py-4 h-full">
          <li className="room h-full flex flex-col gap-8 justify-between py-2">
            <div>
              <form onSubmit={(e) => e.preventDefault()}>
                <Input
                  className="w-full h-[40px]"
                  placeholder="Room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </form>
            </div>
            <div className="room__buttons w-full flex gap-2">
              <Button
                className="w-full text-salate-50"
                disabled={!roomName.trim()}
              >
                <Link
                  className="w-full h-full text-slate-50 text-center block"
                  href={`/room/${normalizeRoomName(roomName.trim())}/`}
                >
                  Create Room
                </Link>
              </Button>
            </div>
          </li>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRoom;
