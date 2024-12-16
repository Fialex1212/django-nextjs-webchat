"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ActiveUSers = {
  id: string
  user: string
  room: string
  ip: string
}

export const columns: ColumnDef<ActiveUSers>[] = [
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "room",
    header: "Room",
  },
  {
    accessorKey: "ip",
    header: "Ip",
  },
]
