import { create } from "zustand";

interface ChatState {
  message: string;
  setMessage: (message: string) => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
  messages: { username: string; text: string }[];
  setMessages: (messages: { username: string; text: string }[]) => void;
  guestUsername: string;
  setGuestUsername: (username: string) => void;
  roomExists: boolean | null;
  setRoomExists: (exists: boolean | null) => void;
  loading: boolean | null;
  setLoading: (loading: boolean | null) => void;
  password: string;
  setPassword: (password: string) => void;
  showPasswordModal: boolean;
  setShowPasswordModal: (show: boolean) => void;
}

const useChatStore = create<ChatState>((set) => ({
  message: "",
  setMessage: (message) => set({ message }),
  socket: null,
  setSocket: (socket) => set({ socket }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  guestUsername: "",
  setGuestUsername: (username) => set({ guestUsername: username }),
  roomExists: null,
  setRoomExists: (exists) => set({ roomExists: exists }),
  loading: null,
  setLoading: (loading) => set({ loading }),
  password: "",
  setPassword: (password) => set({ password }),
  showPasswordModal: false,
  setShowPasswordModal: (show) => set({ showPasswordModal: show }),
}));

export default useChatStore;
