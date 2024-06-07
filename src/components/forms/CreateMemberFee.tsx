import { Button } from "@/components/ui/button";

import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomDialogForm } from "../CustomDialogForm";
import { LabelledInput, addMonths } from "../LabelledInput";

import {
  FeeOptions,
  MemberOptions,
  useFeeCategories,
  useMembers,
} from "@/hooks";
import { Label } from "../ui/label";
type Frequency =
  | "monthly"
  | "quarterly"
  | "halfYearly"
  | "yearly"
  | "admission";

export const CreateMemberFee = () => {
  const navigate = useNavigate();
  const { gymId } = useParams<{ gymId: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const { feeCategories, feeCategoryLoading } = useFeeCategories({
    gymId: gymId!,
  });

  const [feeCategoriesList, setFeeCategoriesList] = useState<FeeOptions[]>([]);

  const [memberId, setMemberId] = useState("");
  const [feeCategoryId, setFeeCategoryId] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paidDate, setPaidDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>(addMonths(new Date(), 1));
  const [remarks, setRemarks] = useState("Success");
  const [MemberList, setMemberList] = useState<MemberOptions[]>([]);
  const { members, loading, dummy, render } = useMembers({ gymId: gymId! });

  const clear = () => {
    setMemberId("");
    setRemarks("");
    setPaymentMethod("");
    setSelectedAmount(0);
    setIsDialogOpen(false);
    setError("");
  };
  useEffect(() => {
    if (!loading) {
      setMemberList(members);
    }
  }, [members, dummy]);

  useEffect(() => {
    if (!feeCategoryLoading) {
      setFeeCategoriesList(feeCategories);
    }
  }, [feeCategories]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    setFeeCategoryId(selectedCategoryId);
    const selectedCategory = feeCategoriesList.find(
      (item) => item.id === selectedCategoryId
    );
    if (selectedCategory) {
      setSelectedAmount(selectedCategory.amount);
      setDueDate(calculateDueDate(paidDate, selectedCategory.frequency));
    }
  };

  const calculateDueDate = (startDate: Date, frequency: string): Date => {
    const frequencies = {
      admission: 0,
      monthly: 1,
      quarterly: 3,
      halfYearly: 6,
      yearly: 12,
    };
    const monthsToAdd = frequencies[frequency.toLowerCase() as Frequency] || 1;
    return addMonths(startDate, monthsToAdd);
  };

  async function handleSubmit() {
    try {
      const submit = await fetch(
        `${BACKEND_URL}/api/v1/admin/${gymId}/memberFees`,
        {
          method: "POST",
          body: JSON.stringify({
            memberId,
            feeCategoryId,
            paidDate,
            dueDate,
            remarks,
            amount: selectedAmount,
            paymentMethod,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") ?? "",
          },
        }
      );
      if (!submit.ok) {
        throw new Error("Failed to create batch");
      }

      console.log("Member created successfully");
      clear();
      navigate(`/gym/${gymId}/menu`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else setError("An unexpected error occurred");
    }
  }
  return (
    <div>
      <CustomDialogForm
        fn={() => render((prev) => prev + 1)}
        isOpen={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(!isDialogOpen)}
        FormTitle="Record a Payment"
        FormDescription=" Please add all the necessary fields and click save"
        titleButton="Create Member"
        children={
          <div>
            <div className="grid grid-cols-4 items-center gap-4 pt-2">
              <Label htmlFor="member" className="text-right">
                Member
              </Label>
              <select
                id="member"
                value={memberId}
                onChange={(e) => {
                  setMemberId(e.target.value);
                }}
                className="col-span-3 dark:bg-black"
              >
                <option value="">Choose Member</option>
                {MemberList.map((member) => (
                  <option key={member.id} value={member.Members[0].id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4 pt-2">
              <Label htmlFor="feeCategory" className="text-right">
                Fee Category
              </Label>
              <select
                id="feeCategory"
                value={feeCategoryId}
                onChange={handleSelectionChange}
                className="col-span-3 dark:bg-black"
              >
                <option value="">Choose package</option>
                {feeCategoriesList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.description} - {item.frequency}
                  </option>
                ))}
              </select>
            </div>
            <LabelledInput
              formId="amount"
              formName="Amount"
              label="Amount"
              type="text"
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
              placeholder="Amount"
            />

            <LabelledInput
              formId="date"
              formName="date"
              label="Payment Date"
              placeholder={"Enter Date"}
              selectedDate={paidDate}
              pickDate={(date) => {
                setPaidDate(date);
                const selectedCategory = feeCategoriesList.find(
                  (item) => item.id === feeCategoryId
                );
                if (selectedCategory) {
                  setDueDate(
                    calculateDueDate(date, selectedCategory.frequency)
                  );
                }
              }}
              type="Calendar"
            />

            <LabelledInput
              formId="method"
              formName="method"
              label="Payment Method"
              placeholder="Payment Mode"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <LabelledInput
              formId="remark"
              formName="remark"
              label="Remarks"
              placeholder="Enter Pending amount if any"
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        }
        button={
          <Button type="submit" onClick={handleSubmit} variant={"outline"}>
            Save changes
          </Button>
        }
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
