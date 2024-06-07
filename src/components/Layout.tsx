import { Appbar } from "./AppBar";
import {
  SidebarItem,
  HomeIcon,
  TransferIcon,
  TransactionsIcon,
} from "./SideBar";
import { Button } from "./ui/button";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="">
      <Appbar
        children={
          <Button onClick={() => {}} size={"sm"} variant={"outline"}>
            Logout
          </Button>
        }
      />
      <div className="flex ">
        <div className="w-72 min-h-screen pt-28 hidden lg:block bg-gray-300 bg-opacity-10 dark:bg-opacity-10 backdrop-filter backdrop-blur-sm  rounded-lg">
          <div>
            <SidebarItem href={"/gym"} icon={<HomeIcon />} title="Home" />
            <SidebarItem
              href={"/gym/programs"}
              icon={<TransferIcon />}
              title="Programs"
            />
            <SidebarItem
              href={"/payment"}
              icon={<TransactionsIcon />}
              title="Record Payment"
            />
          </div>
        </div>
        <div className="w-full dark:bg-black bg-white">{children}</div>
      </div>
    </div>
  );
}
