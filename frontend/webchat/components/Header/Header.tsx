"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import Notifications from "./Notifications";
import Searching from "./Searching";
import User from "./User";
import { headerNavbar } from "./utils";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <section className="my-8">
      <div className="container">
        <Card className="py-2 px-6 flex justify-between">
          <div className="flex justify-center items-center gap-6">
            <Link className="text-[32px] cursor-pointer" href={"/"}>
              WChat
            </Link>
            <ul className="flex gap-4">
              {headerNavbar.map((item, key) => (
                <li key={key}>
                  <Link className="text-[18px]" href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Searching />
            <div className="flex justify-center items-center gap-4">
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
