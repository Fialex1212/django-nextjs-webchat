"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface Message {
  user_id: string;
  content: string;
}

interface WebSocketData {
  type: "history" | "message" | "connection_established" | "error";
  user_id?: string;
  room_id?: string;
  message?: string;
  messages?: Message[];
}

interface ChatProps {
  roomName: string;
}

export default function Chat({ roomName }: ChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!roomName) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    setSocket(ws);

    ws.onmessage = (event: MessageEvent) => {
      const data: WebSocketData = JSON.parse(event.data);

      if (data.type === "connection_established" && data.user_id) {
        setCurrentUserId(data.user_id);
      } else if (data.type === "history" && data.messages) {
        setMessages(data.messages);
      } else if (
        data.type === "message" &&
        typeof data.user_id === "string" &&
        typeof data.message === "string"
      ) {
        setMessages((prev) => [
          ...prev,
          {
            user_id: data.user_id as string,
            content: data.message as string,
          },
        ]);
      }
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [roomName]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link. Try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  const sendMessage = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: msg }));
    }
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex flex-col justify-between">
      <div className="flex justify-center items-center gap-8">
        <h2 className="text-center text-[48px]">Chat: {roomName}</h2>
        <Button className="flex justify-center items-center" onClick={copyLink}>
          <Link color="white"></Link>
        </Button>
      </div>

      <ul
        className="overflow-y-auto flex-1"
        style={{ maxHeight: "calc(100vh - 500px)" }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.user_id === currentUserId ? `${msg.user_id} (me)` : msg.user_id}
            </strong>
            : {msg.content}
          </div>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          name="message"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="text-white flex gap-2"
          type="submit"
          disabled={!message.trim()}
        >
          <Send />
          Send
        </Button>
      </form>
    </div>
  );
}
