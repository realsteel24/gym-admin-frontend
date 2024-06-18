import { Button } from "@/components/ui/button";

import { BACKEND_URL } from "@/config";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomDialogForm } from "../CustomDialogForm";
import { LabelledInput } from "../LabelledInput";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

enum PaymentFrequency {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  HalfYearly = "HalfYearly",
  Yearly = "Yearly",
}

export const CreateFeeCategory = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1500);
  const [frequency, setFrequency] = useState<PaymentFrequency>(
    PaymentFrequency.Monthly
  );
  const { toast } = useToast();
  const navigate = useNavigate();
  const { gymId } = useParams<{ gymId: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value as PaymentFrequency);
  };

  const getEnumValues = <T extends object>(enumObj: T): string[] => {
    return Object.values(enumObj).filter(
      (value) => typeof value === "string"
    ) as string[];
  };

  const frequencyOptions = getEnumValues(PaymentFrequency);

  const clear = () => {
    setDescription("");
    setAmount(0);
    setError("");
    setIsDialogOpen(false);
  };

  async function handleSubmit() {
    try {
      const submit = await fetch(
        `${BACKEND_URL}/api/v1/admin/${gymId}/feeCategory`,
        {
          method: "POST",
          body: JSON.stringify({
            description,
            amount,
            frequency,
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

      console.log("Fee category created successfully");
      toast({
        title: "Package successfully created",
        description: "Success",
      });
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
        isOpen={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(!isDialogOpen)}
        FormTitle="Create Fee Package"
        FormDescription=" Please add all the necessary fields and click save"
        titleButton="Create Fee Package"
        children={
          <div>
            <LabelledInput
              label="Category Name"
              placeholder="Package Name"
              onChange={(e) => setDescription(e.target.value)}
            />
            <LabelledInput
              label="Amount"
              placeholder="Amount"
              defaultValue="1500"
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />

            <div className="grid grid-cols-4 items-center gap-4 pt-2">
              <Label className="text-right">Duration</Label>
              <select
                id="frequency"
                value={frequency}
                onChange={handleFrequencyChange}
                className="col-span-3 dark:bg-black "
              >
                {frequencyOptions.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>
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
