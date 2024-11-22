"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useUserData } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userButtons } from "./utils";
import { LogOut, Settings } from "lucide-react";

const Profile = () => {
  const { id, username, email, clearUserData } = useUserData();
  const { clearToken, token } = useAuth();
  const router = useRouter();

  const logout = () => {
    clearToken();
    clearUserData();
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    const checkToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (!token) {
        router.push("/auth/sign-in");
      }
    };
    checkToken();
  }, [router, token]);

  return (
    <section>
      <div className="container">
        {id && username && email ? (
          <>
            {" "}
            <Card className="py-4 px-6 flex gap-4 relative mb-4">
              <Avatar className="h-[100px] w-[100px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <div className="user__info flex flex-col justify-center">
                <h2 className="text-[32px]">{username}</h2>
                <p className="text-[20px]">{email}</p>
              </div>
              <button
                className="absolute bottom-4 right-6"
                onClick={logout}
              >
                <LogOut />
              </button>
            </Card>
            <ul className="flex flex-col gap-3">
              {userButtons.map((button, index) => (
                <li key={index}>
                  <Link href={button.link}>
                    <Card className="py-4 px-6 text-[20px] flex items-center gap-4">
                      {button.icon}
                      {button.name}
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>Loading user data...</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;

// TODO:
// function parseJwt(token) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }

// // Assuming the JWT is stored in localStorage
// const token = localStorage.getItem('token');
// if (token) {
//   const userInfo = parseJwt(token);
//   console.log(userInfo); // Displays { username, email, id, ... }

//   // Example usage: display on the site
//   document.getElementById("username").innerText = userInfo.username;
//   document.getElementById("email").innerText = userInfo.email;
// }

// Replace my userContext to parseJWT
