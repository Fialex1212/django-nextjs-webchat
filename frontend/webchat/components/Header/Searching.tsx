import React, { useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { set } from "zod";

const Searching = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        className="w-[340px] h-[40px]"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Searching;
