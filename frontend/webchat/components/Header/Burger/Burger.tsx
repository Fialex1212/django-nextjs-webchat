"use client"

import React, { useEffect } from "react";
import ToggleBurger from "./ToggleBurger";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import useBurgerStore from "@/stores/useBurgerStore";

const Burger = () => {
  const { isOpen, toggleBurger, closeMenu } = useBurgerStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeMenu]);
  return (
    <div className="w-screen h-screen absolute top-0 z-2 bg-background">
      <div className="container">
        <div className="flex justify-between px-[24px] py-[56px]">
          <div className="flex flex-col gap-[20px]">
            <Link
              onClick={closeMenu}
              className="text-[20px] sm:text-[32px] cursor-pointer"
              href={"/"}
            >
              Logo
            </Link>
            <Link onClick={closeMenu} href={"/profile/me"}>Profile</Link>
            <Link onClick={closeMenu} href={"/profile/me/notifications"}>Notifications</Link>
            <Link onClick={closeMenu} href={"/search"}>Search</Link>
            <ModeToggle />
          </div>
          <ToggleBurger />
        </div>
      </div>
    </div>
  );
};

export default Burger;
