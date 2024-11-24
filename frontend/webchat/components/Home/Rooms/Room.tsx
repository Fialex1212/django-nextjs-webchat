import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Lock, Unlock, Calendar} from "lucide-react";
import { useUserData } from "@/contexts/userContext";
import SettingsRoom from "./SettingsRoom";

interface TagData {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
  is_private: boolean;
  created_at: string;
  created_by: string;
  tags: TagData[];
}

const Room: React.FC<{ room: Room }> = ({ room }) => {
  const {id} = useUserData();

  return (
    <Card>
      <CardContent className="px-6 py-4 h-full">
        <li className="room h-full flex flex-col gap-2 justify-between">
          <div className="room__info">
            <h4 className="text-[32px] flex items-center gap-2">
              {room.name}
              {room.is_private ? <Lock /> : <Unlock />}
            </h4>
            <div className="flex items-center gap-1 mb-2">
              <Calendar />
              <time suppressHydrationWarning>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(new Date(room.created_at))}
              </time>
            </div>
            <ul className="flex flex-wrap gap-2 mb-2">
              {room.tags.map((tag) => (
                <li className="w-fit" key={tag.id}>
                  <Card className="px-2 py-1">{tag.name}</Card>
                </li>
              ))}
            </ul>
          </div>
          <div className="room__buttons w-full flex gap-2">
            {" "}
            <Button className="w-full text-salate-50">
              <Link
                className="w-full h-full text-slate-50"
                href={`http://localhost:3000/room/${room.name}/`}
              >
                Connect
              </Link>
            </Button>
            {room.created_by === id && (
              <SettingsRoom roomId={room.id} />
            )}
          </div>
        </li>
      </CardContent>
    </Card>
  );
};

export default Room;
