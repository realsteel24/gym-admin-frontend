import { Button } from "@/components/ui/button";
import { MemberFeeOptions } from "@/hooks";
import dateFormat from "dateformat";

const checkAndUpdateStatus = (dueDate: string, status: string) => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  if (dueDateObj < today) {
    return "Pending";
  }

  return status;
};

export const MemberFeesColumns = [
  {
    accessorKey: "Member.User.name",
    header: "Name",
  },
  {
    accessorKey: "FeeCategory.description",
    header: "Package",
  },
  {
    accessorKey: "Payments",
    header: "Amount Paid",
    cell: ({ row }: { row: { original: MemberFeeOptions } }) => {
      const amount = row.original.Payments?.[0]?.amount ?? "N/A";
      return amount;
    },
  },
  {
    accessorKey: "paidDate",
    header: "Payment Date",
    cell: ({ row }: { row: { original: MemberFeeOptions } }) => {
      const paidDate = row.original.paidDate ?? "N/A";
      return dateFormat(paidDate, "dd/mm/yyyy");
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }: { row: { original: MemberFeeOptions } }) => {
      const dueDate = row.original.dueDate ?? "N/A";
      return dateFormat(dueDate, "dd/mm/yyyy");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: MemberFeeOptions } }) => {
      const dueDate = row.original.dueDate;
      const status = checkAndUpdateStatus(dueDate, row.original.status);
      return (
        <span
          className={`${
            status === "Pending" ? "text-red-500" : "text-green-500"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: () => (
      <Button onClick={() => {}} size={"sm"} variant={"outline"}>
        View Payment Details
      </Button>
    ),
  },
];
