"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "@/contexts/userContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const {username} = useUserData();

  const fetchNotifications = async () => {
    const token = localStorage.getItem("jwt-token");
    
    const response = await axios.get("http://127.0.0.1:8000/api/notifications/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-User-Name": username,
      },
    });
    return response.data;
  };

  const markAsRead = async (id) => {
    const response = await axios.post(
      `/api/notifications/${id}/mark-as-read/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }
    );
    return response.data;
  };

  useEffect(() => {
    const getNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
    };
    getNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, is_read: true } : notif
      )
    );
  };

  return (
    <section>
      <div className="container">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>
              {notif.message}
              {notif.is_read ? (
                <span> (Read)</span>
              ) : (
                <button onClick={() => handleMarkAsRead(notif.id)}>
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Notifications;
