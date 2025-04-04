"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import Searching from "./Searching";
import { ModeToggle } from "./ModeToggle";
import { Accessibility } from "lucide-react";

const Header = () => {
  return (
    <header className="my-8">
      <div className="container">
        <Card className="w-full h-[70px] py-2 px-6 flex justify-between">
          <div className="flex justify-center items-center gap-2">
            <Link
              className="text-[20px] sm:text-[32px] cursor-pointer"
              href={"/"}
            >
              Anonymous Chat
            </Link>
            <Accessibility />
          </div>
          <div className="flex justify-center items-center gap-[20px]">
            <Searching />
            <div className="justify-center items-center gap-[20px] hidden sm:flex">
              <ModeToggle />
            </div>
          </div>
        </Card>
      </div>
    </header>
  );
};

export default Header;
