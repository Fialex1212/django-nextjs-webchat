import React from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";

const ChatInviteLink = ({ roomName }: { roomName: string }) => {
  const inviteLink = `${window.location.protocol}//${window.location.host}/room/${roomName}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard!");
  };
  return (
    <>
      <Button className="h-[40px] text-white" onClick={handleCopyLink}>
        Invite link
        <Copy />
      </Button>
    </>
  );
};

export default ChatInviteLink;
