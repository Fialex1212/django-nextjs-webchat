"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import Notifications from "./Notifications";
import Searching from "./Searching";
import User from "./User";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <section className="my-8">
      <div className="container">
        <Card className="w-full h-[70px] py-2 px-6 flex justify-between">
          <div className="flex justify-center items-center gap-6">
            <Link className="text-[32px] cursor-pointer" href={"/"}>
              Logo
            </Link>
          </div>
          <div className="flex justify-center items-center gap-[20px]">
            <Searching />
            <div className="flex justify-center items-center gap-[20px]">
              <Notifications />
              <ModeToggle />
              <User />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Header;
