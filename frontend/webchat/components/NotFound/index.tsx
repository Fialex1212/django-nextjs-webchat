"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-268px)]">
        <div className="flex flex-col justify-center items-center text-[64px] mb-[60px]">
          <h2>404</h2>
          <h2>Page not found</h2>
        </div>
        <Button
          className="text-white w-[280px] h-[80px] text-[30px]"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back to Home
        </Button>
    </div>
  );
};

export default NotFound;
