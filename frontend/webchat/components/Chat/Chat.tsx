"use client";

import { useUserData } from "@/contexts/userContext";
import { useEffect, useState } from "react";

interface ChatRoomProps {
  roomName: string;
}

const Chat: React.FC<ChatRoomProps> = ({ roomName }) => {
  const { username } = useUserData();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { username: string; text: string }[]
  >([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: data.username, text: data.message },
      ]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    setSocket(ws);
    console.log(roomName);

    return () => {
      ws.close();
    };
  }, [roomName]);

  const handleSendMessage = () => {
    if (message && socket) {
      socket.send(JSON.stringify({ message, username: username || "Guest" }));
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div>
      <h1>Room: {roomName}</h1>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.username}:</strong> {msg.text}
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
