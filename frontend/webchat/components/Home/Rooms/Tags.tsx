import { useState, useEffect } from "react";
import axios from "axios";
import cn from "classnames";
import { Card } from "@/components/ui/card";
import { useRoomsStorage } from "@/stores/useRoomsStorage";
import TagsDrawer from "./TagsDrawer";
import { useAuthStore } from "@/stores/useAtuhStore";

interface TagData {
  id: string;
  name: string;
}

const Tags = () => {
  const { user } = useAuthStore()
  const rooms = useRoomsStorage((state) => state.rooms);
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
    } catch (error) {
      console.log(error);
    } finally {
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

  const filterMyRooms = (rooms: Array<any>) => {
    if (!Array.isArray(rooms)) {
      console.error("Invalid rooms data: Expected an array but got", rooms);
      return [];
    }
    console.log(rooms.filter((room) => room.created_by === user?.id));
    return rooms.filter((room) => room.created_by === user?.id);
  };

  const handleMyRoomsClick = () => {
    const newSelectedTags = selectedTags.includes("My rooms")
      ? selectedTags.filter((t) => t !== "My rooms")
      : [...selectedTags, "My rooms"];
    setSelectedTags(newSelectedTags);
    filterRooms();
    const myRooms = filterMyRooms(rooms);
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [selectedTags, filterRooms]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-end md:justify-normal">
      <ul className="hidden md:flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Card
              className={cn("py-2 px-6 cursor-pointer", {
                "bg-blue-600 text-white": selectedTags.includes(tag.name),
              })}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </Card>
          </li>
        ))}
        <li>
          <Card
            className={cn("py-2 px-6 cursor-pointer", {
              "bg-blue-600 text-white": selectedTags.includes("My rooms"),
            })}
            onClick={() => handleMyRoomsClick()}
          >
            My rooms
          </Card>
        </li>
      </ul>
      <TagsDrawer
        handleMyRoomsClick={handleMyRoomsClick}
        handleTagClick={handleTagClick}
        tags={tags}
      />
    </div>
  );
};

export default Tags;
