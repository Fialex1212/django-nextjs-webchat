import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";

interface ChatPopupPasswordProps {
    showPasswordModal: boolean;
    handlePasswordSubmit: () => void;
    password: string;
    setPassword: (password: string) => void;
  }

const ChatPopupPassword = ({
  showPasswordModal,
  handlePasswordSubmit,
  password,
  setPassword,
}: ChatPopupPasswordProps) => {
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <Dialog open={showPasswordModal}>
      <DialogContent>
        <h2 className="text-lg font-bold mb-4">Enter Password</h2>
        <Input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Room Password"
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button className="text-white" onClick={handlePasswordSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPopupPassword;
