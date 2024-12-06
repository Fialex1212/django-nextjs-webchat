"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import Notifications from "./Notifications";
import Searching from "./Searching";
import User from "./User";
import { ModeToggle } from "./ModeToggle";
import useBurgerStore from "@/store/useBurgerStore";

const Header = () => {
  const {toggleBurger} = useBurgerStore();

  return (
    <div className="my-8">
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
            <div
              className="block HAMBURGER-ICON space-y-2 sm:hidden"
              onClick={() => toggleBurger()}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Header;
