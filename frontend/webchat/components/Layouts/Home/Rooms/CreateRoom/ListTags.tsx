"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import cn from "classnames";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";

interface TagData {
  id: string;
  name: string;
}

const ListTags = ({ setSelectedTags, selectedTags }: {setSelectedTags: any, selectedTags: any}) => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const getTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/rooms/tags/"
        );
        setTags(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTags();
  }, []); 

  const handleTagClilck = (name: string) => {
    if (selectedTags.includes(name)) {
        setSelectedTags(selectedTags.filter((tag: string) => tag !== name))
        toast.success(`You deleted tag ${name}`);
    } else {
        setSelectedTags([...selectedTags, name])
        toast.success(`You selected tag ${name}`);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {tags.map(({id, name}, index) => (
          <li key={index} onClick={() => handleTagClilck(name)}>
            <Card className={cn("p-2 cursor-pointer", {"text-white bg-primary": selectedTags.includes(name)})}>{name}</Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTags;
