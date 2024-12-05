"use client";

import { useUserData } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Copy } from "lucide-react";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "react-hot-toast";
import InviteLink from "./InviteLink";

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
  const [roomExists, setRoomExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.message && socket) {
      socket.send(
        JSON.stringify({
          message: data.message,
          username: username || guestUsername,
        })
      );
      form.reset();
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
    const checkRoomStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/rooms/${roomName}/`
        );
        if (response.ok) {
          const data = await response.json();
          if (!data.is_private) {
            setRoomExists(true);
          } else {
            const password = prompt("Enter the room password:");
            if (password) {
              const passwordCheckResponse = await fetch(
                `http://127.0.0.1:8000/api/rooms/${data.room_id}/check_password/`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ password }),
                }
              );

              if (passwordCheckResponse.ok) {
                setRoomExists(true);
              } else {
                alert("Incorrect password.");
                setRoomExists(false);
              }
            } else {
              setRoomExists(false);
            }
          }
        } else if (response.status === 404) {
          setRoomExists(false);
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        console.error("Error checking room status:", error);
        setRoomExists(false);
      } finally {
        setLoading(false);
      }
    };

    checkRoomStatus();
  }, [roomName]);

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
  }, [roomName, username, roomExists]);

  if (loading === true) {
    return (
      <section>
        <div className="container">
          <Card className="py-1 px-1 flex-col gap-4 relative mb-4">
            <CardContent>
              <p className="text-center">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (roomExists === false) {
    return (
      <section>
        <div className="container">
          <Card className="py-1 px-1 flex-col gap-4 relative mb-4">
            <CardHeader>
              <h2 className="text-[32px] text-center mb-4">Room Not Found</h2>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                The room "{roomName}" does not exist.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Toaster />
      <div className="container">
        <Card className="py-1 px-1 flex-col gap-4 relative mb-4">
          <CardHeader>
            <div className="w-full flex justify-center items-center gap-2 mb-4">
              <h2 className="text-[32px] text-center">{roomName}</h2>
              <InviteLink roomName={roomName} />
            </div>
          </CardHeader>
          <CardContent>
            <ul>
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
              <Button
                type="submit"
                className="w-[40px]"
                onClick={handleSendMessage}
              >
                <Send color="white" />
              </Button>
            </Form>
          </CardFooter>
          {showPasswordModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Enter Password</h2>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Room Password"
                />
                <Button
                  onClick={async () => {
                    const passwordCheckResponse = await fetch(
                      `http://127.0.0.1:8000/api/rooms/${roomName}/check_password/`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ password }),
                      }
                    );

                    if (passwordCheckResponse.ok) {
                      setRoomExists(true);
                      setShowPasswordModal(false);
                    } else {
                      alert("Incorrect password.");
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default Chat;
