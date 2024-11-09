"use client"

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Notifications from "./Notifications";
import { useAuth } from "@/contexts/authContext";

const Header = () => {
  const {token} = useAuth();
  return (
    <section className="mt-8">
      <div className="container">
        <Card className="py-2 px-6 flex justify-between rounded-[20px]">
          <Link className="text-[32px] cursor-pointer" href={"/"}>
            Logo
          </Link>
          <div className="flex justify-center items-center gap-4">
            <Input className="w-[400px] h-[50px]" placeholder="Search..." />
            <div className="flex justify-center items-center gap-4">
              <Notifications />
              {token ? (
                <Link href="/profile">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Link href="/auth/sign-in">Sign in</Link>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Header;
