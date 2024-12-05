"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import useSearchStore from "@/store/useSearchStore";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { results, query, setQuery, getData, isLoading, error } =
    useSearchStore();

    useEffect(() => {
      if (searchQuery && searchQuery !== query) {
        setQuery(searchQuery);
        getData();  // Trigger a new search
      }
    }, [searchQuery, query, setQuery, getData]);

  if (isLoading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  return (
    <section className="flex flex-col h-[calc(100vh-100px)] items-center justify-start">
      <div className="container">
        <div className="results">
          {results.length > 0 ? (
            <ul className="results__list flex flex-col gap-3">
              {results.map((item) => (
                <li key={item.id}>
                  <Link href={`/profile/${item.id}`}>
                    <Card className="flex items-center">
                      <CardContent className="py-4 text-[20px]">
                        {item.name}
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <h2 className="py-2 text-[30px] text-center">No results found</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
