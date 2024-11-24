import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserData } from "@/contexts/userContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LogOut, Settings, } from "lucide-react";
import { useRouter } from "next/navigation";

const User = () => {
  const { username, clearUserData } = useUserData();
  const { token, clearToken } = useAuth();
  const router = useRouter();

  
  const logout = () => {
    clearToken();
    clearUserData();
    router.push("/auth/sign-in");
  };

  return (
    <div>
      {token ? (
        <HoverCard>
          <HoverCardTrigger>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="mt-5 w-fit">
            <div className="flex flex-col gap-[18px]">
              <Link className="flex items-center gap-[10px]" href={"/profile/settings"}><Settings /> Settings</Link>
              <div className="flex items-center gap-[10px] cursor-pointer" onClick={logout}><LogOut />Leave</div>
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
