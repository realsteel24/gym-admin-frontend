
import { CreateProgram } from "../forms/CreateProgram";
import { ViewPrograms } from "@/pages/tables/Programs";
import { useNavigate, useParams } from "react-router-dom";
import { CardMenu } from "../CardMenu";

export function PaymentCard() {
  const { gymId } = useParams<{ gymId: string }>();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-4 mx-6 my-6">
      <CardMenu
        cardTitle="Record Expense"
        type="elementCard"
        children={<CreateProgram />}
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
