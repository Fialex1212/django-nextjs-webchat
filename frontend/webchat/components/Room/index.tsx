import { Card, CardContent } from "@/components/ui//card";
import { Button } from "@/components/ui//button";
import Link from "next/link";

const Room = ({ room }: { room: string }) => {
  return (
    <Card>
      <CardContent className="px-6 py-4 h-full">
        <li className="room h-full flex flex-col gap-2 justify-between">
          <div className="room__info">
            <h4 className="text-[32px] flex items-center gap-2">{room}</h4>
          </div>
          <div className="room__buttons w-full flex gap-2">
            <Button className="w-full text-salate-50">
              <Link
                className="w-full h-full text-slate-50"
                href={`room/${room}/`}
              >
                Connect
              </Link>
            </Button>
          </div>
        </li>
      </CardContent>
    </Card>
  );
};

export default Room;
