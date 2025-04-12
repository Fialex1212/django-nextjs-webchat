"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import SearchBar from "./SearchBar";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="my-8">
      <div className="container">
        <Card className="w-full h-[120px] sm:h-[70px] gap-2 sm:gap-0 py-2 px-6 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <Link
                className="text-[20px] sm:text-[26px] md:text-[32px] cursor-pointer"
                href={"/"}
              >
                Anonymous Chat
              </Link>
            </div>
            <div className="flex justify-center items-center gap-[20px]">
              <div className="invisible sm:visible w-0 sm:w-fit">
                <SearchBar />
              </div>
              <div className="justify-center items-center gap-[20px] flex sm:flex">
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="visible sm:invisible w-full sm:w-0">
            <SearchBar />
          </div>
        </Card>
      </div>
    </header>
  );
};

export default Header;
