import { ColumnDef } from "@tanstack/react-table";
import dateFormat from "dateformat";
import { MemberOptions } from "@/hooks";

export const MemberColumns: ColumnDef<MemberOptions>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact Number",
  },
  {
    accessorKey: "programName",
    header: "Program",
  },
  {
    accessorKey: "batchName",
    header: "Batch",
  },
  {
    accessorKey: "enrollmentDate",
    header: "Enrollment Date",
    cell: ({ row }) => {
      const enrollmentDate =
        row.original.Members && row.original.Members[0]?.enrollmentDate;
      return enrollmentDate
        ? dateFormat(row.original.Members[0].enrollmentDate, "dd/mm/yyyy")
        : "N/A";
    },
  },
  {
    accessorKey: "dob",
    header: "Birth Date",
    cell: ({ row }) =>
      row.original.dob ? dateFormat(row.original.dob, "dd/mm/yyyy") : "N/A",
  },
];
