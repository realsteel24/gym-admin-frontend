import { ColumnDef } from "@tanstack/react-table";
import { MemberOptions } from "../hooks/index";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<MemberOptions>[] = [
  {
    accessorKey: "id",
    header: ()=> <div className="">Id</div>,
  },

  {
    accessorKey: "batch",
    header: "Batch",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];
