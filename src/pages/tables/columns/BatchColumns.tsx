import { Button } from "@/components/ui/button";
import { BatchOptions } from "@/hooks";
import { ColumnDef } from "@tanstack/react-table";

export const BatchColumns: ColumnDef<BatchOptions>[] = [
  {
    accessorKey: "Program.name",
    header: "Program Name",
  },
  {
    accessorKey: "name",
    header: "Batch Name",
  },
  {
    accessorKey: "_count.MemberPrograms",
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
        onClick={() => row.original.navigate(`/gym/${row.original.id}/menu`)}
        size={"sm"}
      >
        View Members
      </Button>
    ),
  },
];
