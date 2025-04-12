"use client";

import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-[40px]"
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default SearchBar;
