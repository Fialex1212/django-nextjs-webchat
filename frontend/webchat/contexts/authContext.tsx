"use client";

import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";

// Define the shape of the context value using `type`
type AuthContextType = {
  token: string | null;
  updateToken: (newToken: string | null) => void;
  clearToken: () => void;
};

// Define the props type for AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = JSON.parse(localStorage.getItem("jwt-token") || "null");
    if (savedToken) setToken(savedToken);
  }, []);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    localStorage.setItem("jwt-token", JSON.stringify(newToken));
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("jwt-token");
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
