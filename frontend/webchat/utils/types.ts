export interface Message {
  user_id: string;
  content: string;
}

export interface WebSocketData {
  type: "history" | "message" | "connection_established" | "error";
  user_id?: string;
  room_id?: string;
  message?: string;
  messages?: Message[];
}
