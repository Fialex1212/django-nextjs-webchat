"use client";

import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Searching = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="invisible sm:visible w-0 sm:w-fit">
      <form onSubmit={handleSubmit}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[280px] h-[40px]"
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default Searching;
