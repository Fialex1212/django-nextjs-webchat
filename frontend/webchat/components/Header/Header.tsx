"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import Notifications from "./Notifications";
import Searching from "./Searching";
import User from "./User";
import { ModeToggle } from "./ModeToggle";
import ToggleBurger from "@/components/Header/Burger/ToggleBurger";

const Header = () => {

  return (
    <header className="my-8">
      <div className="container">
        <Card className="w-full h-[70px] py-2 px-6 flex justify-between">
          <div className="flex justify-center items-center gap-6">
            <Link
              className="text-[20px] sm:text-[32px] cursor-pointer"
              href={"/"}
            >
              Logo
            </Link>
          </div>
          <div className="flex justify-center items-center gap-[20px]">
            <Searching />
            <div className="justify-center items-center gap-[20px] hidden sm:flex">
              <Notifications />
              <ModeToggle />
              <User />
            </div>
            <ToggleBurger />
          </div>
        </Card>
      </div>
    </header>
  );
};

export default Header;
