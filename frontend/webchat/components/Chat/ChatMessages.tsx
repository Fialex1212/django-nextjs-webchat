"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "../ui/card";
import Link from "next/link";

interface ChatMessagesProps {
    messages: { username: string; text: string }[];
    guestUsername: string;
  }


const ChatMessages = ({ messages, guestUsername }: ChatMessagesProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <ul className="max-h-96 overflow-y-auto">
      {messages.map((msg, index) => (
        <li key={index}>
          {msg.username === guestUsername ? (
            <div className="flex justify-end">
              <Card className="py-2 px-4 bg-blue-600 flex gap-1 text-white">
                {msg.text}
                <strong>:You</strong>
              </Card>
            </div>
          ) : (
            <div className="flex justify-start">
              <Card className="py-2 px-4 bg-slate-500 flex gap-1 text-white">
                <strong><Link href={`/profile/${msg.username}`}>{msg.username}</Link>:</strong>
                {msg.text}
              </Card>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChatMessages;
