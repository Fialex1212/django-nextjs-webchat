import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateRoom from "./CreateRoom"


const Popup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-2 px-6 cursor-pointer" variant="outline">Create you room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create you room</DialogTitle>
          <DialogDescription>
            Create you room and invite your friends
          </DialogDescription>
        </DialogHeader>
        <CreateRoom />
      </DialogContent>
    </Dialog>
  )
}

export default Popup
