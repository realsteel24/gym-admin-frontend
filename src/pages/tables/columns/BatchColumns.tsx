import { Button } from "@/components/ui/button";
import { BatchOptions } from "@/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { NavigateFunction } from "react-router-dom";
import { ViewMembers } from "../Members";

export const BatchColumns = (
  navigate: NavigateFunction,
  gymId: string
): ColumnDef<BatchOptions>[] => [
  {
    accessorFn: (row) => row.Program?.name,
    header: "Program Name",
  },
  {
    accessorKey: "name",
    header: "Batch Name",
  },
  {
    accessorFn: (row) => row._count?.MemberPrograms,
    header: "Member Count",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  {
    accessorKey: "days",
    header: "Days",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Button
        variant={"outline"}
        onClick={() => ViewMembers(row.original.id, gymId, navigate)}
        size={"sm"}
      >
        View Members
      </Button>
    ),
  },
];
