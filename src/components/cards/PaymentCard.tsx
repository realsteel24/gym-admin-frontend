import { CreateProgram } from "../forms/CreateProgram";
import { ViewPrograms } from "@/pages/tables/Programs";
import { useNavigate, useParams } from "react-router-dom";
import { CardMenu } from "../CardMenu";
import { ViewTransactions } from "@/pages/tables/TransactionHistory";
import { CreateMemberFee } from "../forms/CreateMemberFee";

export function PaymentCard() {
  const { gymId, memberId } = useParams<{ gymId: string; memberId: string }>();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-4 mx-6 my-6">
      <CardMenu
        cardTitle="Record Payment"
        type="elementCard"
        children={<CreateMemberFee />}
      />

      <CardMenu
        cardTitle="Record Expense"
        type="elementCard"
        children={<CreateProgram />}
      />
      <CardMenu
        cardTitle="Incoming Transactions History"
        type="buttonedCard"
        cardFunction={() =>
          ViewTransactions(gymId ?? "", memberId ?? "all", navigate)
        }
        buttonTitle="View Transactions"
      />
      <CardMenu
        cardTitle="View all Expenses"
        type="buttonedCard"
        cardFunction={() => ViewPrograms(gymId ?? "", navigate)}
        buttonTitle="View Expenses"
      />
    </div>
  );
}
