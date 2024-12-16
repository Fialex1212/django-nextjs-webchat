import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAtuhStore";

const User = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout()
    router.push("/auth/sign-in");
  };

  return (
    <div>
      {isAuthenticated ? (
        <HoverCard>
          <HoverCardTrigger>
            <Link href="/profile/me ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user?.username[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="mt-5 w-fit">
            <div className="flex flex-col gap-[18px]">
              <Link
                className="flex items-center gap-[10px]"
                href={"/profile/me/settings"}
              >
                <Settings /> Settings
              </Link>
              <div
                className="flex items-center gap-[10px] cursor-pointer"
                onClick={() => handleLogout()}
              >
                <LogOut />
                Leave
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Link href="/auth/sign-in">Sign in</Link>
      )}
    </div>
  );
};

export default User;
