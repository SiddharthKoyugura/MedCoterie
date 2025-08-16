import { useState, type ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";


type props = {
  openDialogText: string;
  formName: string;
  setText?: (value: string) => void;
  setAuthorName?: (value: string) => void;
  handleSubmit?: () => void;
};

export default function Form({
  openDialogText,
  formName,
  setText,
  setAuthorName,
  handleSubmit,
}: props) {

    const [open, setOpen] = useState<boolean>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>{openDialogText}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit {formName}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Your Name:</Label>
              <Input
                id="name-1"
                name="name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAuthorName && setAuthorName(e.target.value)
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Your {formName}:</Label>
              <Textarea
                id="username-1"
                name="username"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setText && setText(e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={()=> {
                setOpen(false);
                if(handleSubmit){
                    handleSubmit();
                }
            }}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
