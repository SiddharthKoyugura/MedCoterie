import { useState, type ChangeEvent, type FormEvent } from "react";
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
  text: string;
  setText?: (value: string) => void;
  authorName: string;
  setAuthorName?: (value: string) => void;
  handleSubmit?: () => void;
};

export default function Form({
  openDialogText,
  formName,
  text,
  setText,
  authorName,
  setAuthorName,
  handleSubmit,
}: props) {
  const [open, setOpen] = useState<boolean>();
  const [errors, setErrors] = useState<{ authorName?: string; text?: string }>(
    {},
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!authorName.trim()) newErrors.authorName = "Name is required.";
    if (!text.trim()) newErrors.text = `${formName} is required.`;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Stop if validation failed

    if (handleSubmit) handleSubmit();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={onSubmit}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">{openDialogText}</Button>
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
                required
              />
              {errors.authorName && (
                <p className="text-sm text-red-500">{errors.authorName}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Your {formName}:</Label>
              <Textarea
                id="username-1"
                name="username"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setText && setText(e.target.value)
                }
                required
              />
              {errors.text && (
                <p className="text-sm text-red-500">{errors.text}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              // onSubmit={() => {
              //   setOpen(false);
              //   if (handleSubmit) {
              //     handleSubmit();
              //   }
              // }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
