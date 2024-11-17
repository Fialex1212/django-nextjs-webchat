"use client";

import Chat from "@/components/Chat/Chat";
import { useParams } from "next/navigation";

const ChatPage: React.FC = () => {
  const { roomName } = useParams();
  
  return <Chat roomName={roomName as string} />;
};

export default ChatPage;
