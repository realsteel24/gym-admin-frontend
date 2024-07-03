import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { GymOptions } from "@/hooks";

export const GymColumns: ColumnDef<GymOptions>[] = [
  {
    accessorKey: "name",
    header: "Gym",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "operationalHours",
    header: "Operational hours",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Button
        variant={"outline"}
        onClick={() => {
          localStorage.setItem("gymName", row.original.name);
          row.original.navigate(`/gym/${row.original.id}/menu`);
        }}
        size={"sm"}
      >
        Actions
      </Button>
    ),
  },
];
