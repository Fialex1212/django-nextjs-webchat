"use client";

import Burger from "@/components/Header/Burger/Burger";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import useBurgerStore from "@/store/useBurgerStore";
import { useState } from "react";

export default function WebchatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen } = useBurgerStore();
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        {isOpen && <Burger />}
      </body>
    </html>
  );
}
