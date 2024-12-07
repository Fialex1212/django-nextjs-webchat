import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useRoomsStorage } from "@/stores/useRoomsStorage";
import { SlidersHorizontal } from "lucide-react";

const TagsDrawer = ({ handleTagClick, handleMyRoomsClick, tags }) => {
  const selectedTags = useRoomsStorage((state) => state.selectedTags);

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="">
            <SlidersHorizontal className="flex md:hidden mb-4" />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter by tags</DrawerTitle>
            <DrawerDescription>Select your tags</DrawerDescription>
          </DrawerHeader>
          <div className="p-2">
            <ul className="flex flex-wrap gap-2 mb-4">
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
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Save</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TagsDrawer;
