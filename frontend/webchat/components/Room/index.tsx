import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Room = ({ room }: { room: string }) => {
  return (
    <Card>
      <CardContent className="px-6 py-4 h-full">
        <li className="room h-full flex flex-col gap-2 justify-between list-none">
          <div className="room__info">
            <h4 className="text-2xl sm:text-3xl">{room}</h4>
          </div>
          <div className="room__buttons w-full flex gap-2">
            <Link href={`/room/${room}/`} className="w-full">
              <Button className="w-full text-white">Connect</Button>
            </Link>
          </div>
        </li>
      </CardContent>
    </Card>
  );
};

export default Room;
