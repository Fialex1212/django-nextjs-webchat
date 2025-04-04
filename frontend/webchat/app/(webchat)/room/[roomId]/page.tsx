"use client";

import Chat from "@/components/Chat";
import { useParams } from 'next/navigation'

const ChatPage: React.FC = () => {
  const {roomId} = useParams ();
  console.log(roomId);
  
  return <Chat roomName={roomId as string} />;
};

export default ChatPage;
