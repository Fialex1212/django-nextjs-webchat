"use client";

import { useEffect } from "react";
import Chat from "@/components/Chat";
import { useParams } from "next/navigation";

const ChatPage: React.FC = () => {
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      document.title = `Chat Room: ${roomId}`;
    } else {
      document.title = "Chat";
    }
  }, [roomId]);

  return <Chat roomName={roomId as string} />;
};

export default ChatPage;