import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
// Adjust the path as needed
import { NavigateFunction } from "react-router-dom";
import { ProgramsOptions } from "@/hooks";
import { ViewBatches } from "../Batches";

export const ProgramColumns = (
  navigate: NavigateFunction,
  gymId: string
): ColumnDef<ProgramsOptions>[] => [
  {
    accessorKey: "name",
    header: "Program Name",
  },
  {
    accessorKey: "_count.Batches",
    header: "Batches",
    cell: ({ row }) => row.original._count.Batches,
  },
  {
    accessorKey: "_count.MemberPrograms",
    header: "Member Count",
    cell: ({ row }) => row.original._count.MemberPrograms,
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <Button
        variant={"outline"}
        onClick={() => ViewBatches(row.original.id, gymId, navigate)}
        size={"sm"}
      >
        View Batches
      </Button>
    ),
  },
];
