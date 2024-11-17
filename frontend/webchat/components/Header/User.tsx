import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserData } from "@/contexts/userContext";

const User = () => {
  const { username } = useUserData();
  const { token } = useAuth();
  return (
    <div>
      {token ? (
        <Link href="/profile">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <Link href="/auth/sign-in">Sign in</Link>
      )}
    </div>
  );
};

export default User;
