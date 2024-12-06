import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import RoomCreate from "./CreateRoom"
import {Plus} from "lucide-react"


const Popup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[40px] h-[40px] rounded-[40px] cursor-pointer" variant="outline"><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create you room</DialogTitle>
          <DialogDescription>
            Create you room and invite your friends
          </DialogDescription>
        </DialogHeader>
        <RoomCreate />
      </DialogContent>
    </Dialog>
  )
}

export default Popup
