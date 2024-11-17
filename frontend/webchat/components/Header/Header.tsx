"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import Notifications from "./Notifications";
import Searching from "./Searching";
import User from "./User";

const Header = () => {
  return (
    <section className="my-8">
        <div className="container">
          <Card className="py-2 px-6 flex justify-between">
            <Link className="text-[32px] cursor-pointer" href={"/"}>
              WChat
            </Link>
            <div className="flex justify-center items-center gap-4">
              <Searching />
              <div className="flex justify-center items-center gap-4">
                <Notifications />
                <User />
              </div>
            </div>
          </Card>
        </div>
    </section>
  );
};

export default Header;
