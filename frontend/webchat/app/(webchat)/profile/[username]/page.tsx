"use client";

import ProfileByName from "@/components/Profile/ProfileByName";
import { useParams } from "next/navigation";

export default function ProfileByIdPage() {
    const {username} = useParams ();
  
    return <ProfileByName username={username as string} />;
};
