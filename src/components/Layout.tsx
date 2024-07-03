import { useNavigate, useParams } from "react-router-dom";
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
}): React.JSX.Element {
  const navigate = useNavigate();
  const { gymId } = useParams<{ gymId: string }>();
  return (
    <div className="">
      <Appbar
        children={
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/signin");
            }}
            size={"sm"}
            variant={"outline"}
          >
            Logout
          </Button>
        }
      />
      <div className="flex ">
        <div className="w-72 min-h-screen pt-28 hidden lg:block bg-gray-300 bg-opacity-10 dark:bg-opacity-10 backdrop-filter backdrop-blur-sm  rounded-lg">
          <div>
            <SidebarItem href={"/gym"} icon={<HomeIcon />} title="Home" />
            <SidebarItem
              //TODO: Change this later
              href={`/gym/${gymId}/dashboard`}
              icon={<TransferIcon />}
              title="Dashboard"
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
