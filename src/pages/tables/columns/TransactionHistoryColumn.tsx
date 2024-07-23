import { MemberFeeOptions } from "@/hooks";
import dateFormat from "dateformat";

export const TransactionHistoryColumn = (
) => [
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

];
