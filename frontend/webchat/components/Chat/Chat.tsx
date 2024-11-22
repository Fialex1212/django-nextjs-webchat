"use client";

import { useUserData } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChatRoomProps {
  roomName: string;
}

const formSchema = z.object({ message: z.string().max(500) });

type FormData = z.infer<typeof formSchema>;

const Chat: React.FC<ChatRoomProps> = ({ roomName }) => {
  const { username } = useUserData();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { username: string; text: string }[]
  >([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [guestUsername, setGuestUsername] = useState<string>("");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    }
  })

  const onSubmit = (data: FormData) => {
    if (data.message && socket) {
      socket.send(
        JSON.stringify({ message: data.message, username: username || guestUsername })
      );
      form.reset();  // Clear the form after sending the message
    }
  };

  const handleSendMessage = () => {
    if (message && socket) {
      socket.send(
        JSON.stringify({ message, username: username || guestUsername })
      );
      setMessage("");
    }
  };

  useEffect(() => {
    const generateGuestUsername = () => {
      return `Guest${Math.floor(Math.random() * 100000)}`;
    };

    const guestName = username || generateGuestUsername();
    setGuestUsername(guestName);

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
  }, [roomName, username]);

  return (
    <section>
      <div className="container">
        <Card className="py-1 px-1 flex-col gap-4 relative mb-4">
          <CardHeader>
            <h2 className="text-[32px] text-center mb-4">{roomName}</h2>
          </CardHeader>
          <CardContent>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  {msg.username === guestUsername ? (
                    <div className="flex justify-end">
                      <Card className="py-2 px-4 bg-blue-600 flex gap-1">
                        {msg.text}
                        <strong>:You</strong>
                      </Card>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <Card className="py-2 px-4 bg-slate-500 flex gap-1">
                        <strong>{msg.username}:</strong>
                        {msg.text}
                      </Card>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex items-center gap-4">
            <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                {...form.register("message")}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <Button type="submit" className="w-[40px]" onClick={handleSendMessage}>
                <Send color="white" />
              </Button>
            </Form>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Chat;
