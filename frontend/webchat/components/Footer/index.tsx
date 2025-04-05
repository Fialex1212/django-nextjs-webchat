import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="my-8">
      <div className="container">
        <Card className="w-full h-[70px] py-2 px-6 flex justify-between">
          <div className="flex justify-center items-center gap-2">
            <Link
              className="text-[20px] sm:text-[32px] cursor-pointer"
              href={"/"}
            >
              Anonymous Chat
            </Link>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;
