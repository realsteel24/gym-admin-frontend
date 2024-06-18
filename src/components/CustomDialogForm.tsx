import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";

export const CustomDialogForm = ({
  FormTitle,
  FormDescription,
  children,
  button,
  titleButton,
  isOpen,
  setIsOpen,
  fn,
}: {
  FormTitle: string;
  FormDescription: string;
  children: React.ReactNode;
  button: React.ReactNode;
  titleButton: React.ReactNode;
  isOpen: boolean;
  fn?: () => void;
  setIsOpen: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={fn} variant={"outline"}>
          {titleButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{FormTitle}</DialogTitle>
          <DialogDescription>{FormDescription} </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{button}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
