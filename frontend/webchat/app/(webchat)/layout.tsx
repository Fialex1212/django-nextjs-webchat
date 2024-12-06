"use client"

import Header  from "@/components/Header/Header";
import { useState } from "react";

export default function WebchatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
