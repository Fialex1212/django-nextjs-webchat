import { useState, useEffect } from "react";
import axios from "axios";
import cn from "classnames";
import { Card } from "@/components/ui/card";
import { useRoomsStorage } from "@/storage/useRoomsStorage";


interface TagData {
  id: string;
  name: string;
}

const Tags = () => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const selectedTags = useRoomsStorage((state) => state.selectedTags);
  const setSelectedTags = useRoomsStorage((state) => state.setSelectedTags);
  const filterRooms = useRoomsStorage((state) => state.filterRooms);

  const getTags = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/rooms/tags/");
      setTags(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    filterRooms();
  };

  useEffect(() => {
    getTags();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <li key={index}>
            <Card
              className={cn("py-2 px-6 cursor-pointer", {
                "bg-blue-600": selectedTags.includes(tag.name),
              })}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
