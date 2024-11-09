"use client";

import { useAuth } from "@/contexts/authContext";
import { useUserData } from "@/contexts/userContext";
import { useState, useEffect } from "react";

const Profile = () => {
  const { id, username, email } = useUserData();
  const { clearToken } = useAuth();

  return (
    <div>
      {id && username && email ? (
        <>
          <h2>Profile</h2>
          <p>Id: {id}</p>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <button onClick={clearToken}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={clearToken}>Logout</button>
          <p>Loading user data...</p>
        </>
      )}
    </div>
  );
};

export default Profile;
