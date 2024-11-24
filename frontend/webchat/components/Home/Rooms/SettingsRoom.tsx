"use client";

import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { useRoomsStorage } from "@/storage/useRoomsStorage";

const SettingsRoom = ({ roomId }) => {
    const { rooms, setRooms } = useRoomsStorage();
  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/rooms/${id}/`
      );
      setRooms(rooms.filter((room) => room.id !== id));
      console.log(response.data);
      toast.success("Successfully deleted room.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-10">
          <Settings color="white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteRoom(roomId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsRoom;
