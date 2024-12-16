import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

const persistUserData = (set) => {
  const storedUser = localStorage.getItem("userData");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: parsedUser,
    isAuthenticated: parsedUser !== null,
    login: (user: User) => {
      localStorage.setItem("userData", JSON.stringify(user));
      set({ user, isAuthenticated: true });
    },
    logout: async () => {
      try {
        await axios.post("http://127.0.0.1:8000/api/users/logout/", null, {
          withCredentials: true,
        });
        console.log("Successfully logged out from the backend.");
        localStorage.removeItem("userData");
        set({ user: null, isAuthenticated: false });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  };
};

// Create the Zustand store with persistence logic
export const useAuthStore = create<AuthState>(persistUserData);
