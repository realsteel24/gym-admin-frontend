import { useMembers } from "../hooks";
import { Button } from "../components/ui/button";
import { DataTable } from "../components/Data-table";
import { columns } from "../components/Columns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { ScrollArea } from "../components/ui/scroll-area";

export const AdminPage = () => {
  const { members, loading } = useMembers();
  if (loading) {
    return <div>....Loading</div>;
  }
  console.log(members);
  return (
    <div>
      <Drawer direction={"left"}>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent className="h-full w-[75%]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Citation</DrawerTitle>
            <DrawerDescription>
              Make sure to check if the given answer is align with the original
              source.
            </DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="overflow-auto p-4 break-all">Hello</ScrollArea>

          <DrawerFooter className="pt-2">
            <p className="text-sm italic">
              Thank you for <strong>diligently</strong> double checking!
            </p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <DataTable columns={columns} data={members} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size={"sm"} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size={"sm"}>
              1
            </PaginationLink>
            <PaginationLink href="#" size={"sm"}>
              2
            </PaginationLink>
            <PaginationLink href="#" size={"sm"}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" size={"sm"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex justify-center mt-4">
        <Button> Save </Button>
      </div>
    </div>
  );
};
