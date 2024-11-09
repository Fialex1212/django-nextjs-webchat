"use client";

import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";

type UserDataContextType = {
  id: string | null;
  username: string | null;
  email: string | null;
  updateUserData: (newUserData: { id: string | null; username: string | null; email: string | null }) => void;
  clearUserData: () => void;
};

type UserDataProviderProps = {
  children: ReactNode;
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider: FC<UserDataProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<{ id: string | null; username: string | null; email: string | null }>({
    id: null,
    username: null,
    email: null,
  });

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("user-data") || "null");
    if (savedUserData) setUserData(savedUserData);
  }, []);

  const updateUserData = (newUserData: { id: string | null; username: string | null; email: string | null }) => {
    setUserData(newUserData);
    localStorage.setItem("user-data", JSON.stringify(newUserData));
  };

  const clearUserData = () => {
    setUserData({ id: null, username: null, email: null });
    localStorage.removeItem("user-data");
  };

  return (
    <UserDataContext.Provider value={{ ...userData, updateUserData, clearUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
