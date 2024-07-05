import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/config";
import { ProgramsOptions, usePrograms } from "@/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomDialogForm } from "../CustomDialogForm";
import { LabelledInput } from "../LabelledInput";
import { useToast } from "../ui/use-toast";

export const CreateBatch = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("8:00 PM");
  const [endTime, setEndTime] = useState("9:00 PM");
  const [days, setDays] = useState("Mon, Wed, Fri");
  const [programId, setProgramId] = useState("");
  const [programsList, setProgramsList] = useState<ProgramsOptions[]>([]);
  const navigate = useNavigate();
  const { gymId } = useParams<{ gymId: string }>();
  const { programLoading, programs, fetchPrograms } = usePrograms({
    gymId: gymId!,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!programLoading) {
      setProgramsList(programs);
    }
  }, [programLoading, programs]);

  const clear = () => {
    setStartTime("");
    setEndTime("");
    setError("");
    setDays("");
    setIsDialogOpen(false);
  };

  async function handleSubmit() {
    try {
      const submit = await fetch(
        `${BACKEND_URL}/api/v1/admin/${gymId}/batches`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            startTime,
            endTime,
            days,
            programId,
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

      console.log("Batch created successfully");
      toast({
        title: "Batch successfully created",
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
        setIsOpen={() => {
          setIsDialogOpen(!isDialogOpen);
          if (!isDialogOpen) {
            fetchPrograms();
          }
        }}
        FormTitle="Create a Batch"
        FormDescription=" Please add all the necessary fields and click save"
        titleButton="Create Batch"
        children={
          <div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label htmlFor="program" className="text-right">
                Select Program
              </Label>
              <select
                id="program"
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                className="col-span-3 dark:bg-black"
              >
                <option value="">Choose Program</option>
                {programsList.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
            </div>
            <LabelledInput
              formId="Batch"
              formName="Batch"
              label="Batch Name"
              placeholder="Batch Name"
              onChange={(e) => setName(e.target.value)}
            />
            <LabelledInput
              formId="Start"
              formName="Start"
              label="Start Time"
              placeholder="Time"
              defaultValue="8:00 PM"
              onChange={(e) => setStartTime(e.target.value)}
            />
            <LabelledInput
              formId="End"
              formName="End"
              label="End Time"
              placeholder="Time"
              defaultValue="9:00 PM"
              onChange={(e) => setEndTime(e.target.value)}
            />
            <LabelledInput
              formId="Days"
              formName="Days"
              label="Days"
              placeholder="Days"
              defaultValue="Mon, Wed, Fri"
              onChange={(e) => setDays(e.target.value)}
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
