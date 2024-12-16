"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userButtons } from "./utils";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/useAtuhStore";

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const hanldeLogout = () => {
    logout();
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    if (isAuthenticated) {
    } else {
      router.push("/auth/sign-in");
    }
  }, [isAuthenticated, router]);

  return (
    <section>
      <div className="container">
        {isAuthenticated ? (
          <>
            {" "}
            <Card className="py-4 px-6 flex gap-4 relative mb-4">
              <Avatar className="h-[100px] w-[100px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user?.username[0]}</AvatarFallback>
              </Avatar>
              <div className="user__info flex flex-col justify-center">
                <h2 className="text-[32px]">{user?.username}</h2>
                <p className="text-[20px]">{user?.email}</p>
              </div>
              <button
                className="absolute bottom-4 right-6"
                onClick={() => hanldeLogout()}
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
