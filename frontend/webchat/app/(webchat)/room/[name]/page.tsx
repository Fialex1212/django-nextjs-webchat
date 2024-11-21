"use client";

import Chat from "@/components/Chat/Chat";
import { useParams } from 'next/navigation'

const ChatPage: React.FC = () => {
  const {name} = useParams ();
  console.log(name);
  
  
  return <Chat roomName={name as string} />;
};

export default ChatPage;
