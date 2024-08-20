import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export const FeeCategoryColumns: ColumnDef<any>[] = [
  {
    accessorKey: "description",
    header: "Category Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "frequency",
    header: "Time Period",
  },
  {
    accessorKey: "_count.MemberFees",
    header: "Count",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Button
        onClick={() => {
          row;
        }}
        size={"sm"}
        variant={"outline"}
      >
        View Payers
      </Button>
    ),
  },
];
