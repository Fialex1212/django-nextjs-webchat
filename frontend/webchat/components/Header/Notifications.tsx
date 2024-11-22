"use client"

import { useState } from "react";
import { BellIcon} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Notifications = () => {
  const [nots, setNots] = useState<any>([
    {
      text: "This is a notifications",
      date: "02-02-2025",
      read: true,
    },
    {
      text: "This is a notifications",
      date: "02-02-2025",
      read: false,
    },
  ]);
  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative flex justify-center items-center gap-2 border p-2 min-w-10 min-h-10 rounded-[10px]">
            <BellIcon className="h-5 w-5"/>
            <div
              className={`absolute -top-2 -right-1 h-3 w-3 rounded-full my-1 ${
                nots.find((x: any) => x.read === false)
                  ? "bg-green-500"
                  : "bg-neutral-200"
              }`}
            ></div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-5" align="center">
          {nots.map((item: any, key: number) => (
            <DropdownMenuItem
              key={key}
              className="py-2 px-3 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2"
            >
              <div
                className={`h-3 w-3 rounded-full my-1 ${
                  !item.read ? "bg-green-500" : "bg-neutral-200"
                }`}
              ></div>
              <div>
                <p>{item.text}</p>
                <p className="text-sx text-neutral-500">{item.date}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
