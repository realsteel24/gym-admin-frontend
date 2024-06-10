import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/config";
import {
  BatchOptions,
  MemberOptions,
  ProgramsOptions,
  useBatches,
  useMembers,
  usePrograms,
} from "@/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { CustomDialogForm } from "../CustomDialogForm";
import { LabelledInput, addMonths } from "../LabelledInput";
import Select from "react-select";

export const CreateMemberProgram = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const [programId, setProgramId] = useState("");
  const [memberId, setMemberId] = useState("");
  const { programLoading, programs } = usePrograms({ gymId: gymId! });
  const { batches } = useBatches({ gymId: gymId!, id: programId });
  const { members, loading, dummy, render } = useMembers({ gymId: gymId! });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addMonths(new Date(), 1));
  const [batchId, setBatchId] = useState("");
  const [batchList, setBatchList] = useState<BatchOptions[]>([]);
  const [memberList, setMemberList] = useState<MemberOptions[]>([]);
  const [programsList, setProgramsList] = useState<ProgramsOptions[]>([]);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && members) {
      setMemberList(members);
    }
  }, [loading, members, dummy]);

  useEffect(() => {
    if (!programLoading && programs) {
      setProgramsList(programs);
    }
  }, [programLoading, programs]);

  useEffect(() => {
    if (batches) {
      setBatchList(batches);
    }
  }, [batches]);

  const clear = () => {
    setProgramId("");
    setBatchId("");
    setMemberId("");
    setError("");
    setIsDialogOpen(false);
  };

  async function handleSubmit() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/admin/${gymId}/memberPrograms`,
        {
          method: "POST",
          body: JSON.stringify({
            startDate,
            endDate,
            programId,
            batchId,
            memberId,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") ?? "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create member program");
      }

      console.log("Member successfully added to program");
      clear();
      navigate(`/gym/${gymId}/menu`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }

  const memberOptions = memberList.map((member) => ({
    value: member.Members[0].id,
    label: member.name,
  }));

  const handleMemberChange = (selectedOption: any) => {
    setMemberId(selectedOption ? selectedOption.value : "");
  };

  return (
    <div>
      <CustomDialogForm
        fn={() => render((prev) => prev + 1)}
        isOpen={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(!isDialogOpen)}
        FormTitle="Add Member to Program"
        FormDescription="Please add all the necessary fields and click save"
        titleButton="Add Member"
        children={
          <div>
            <div className="grid grid-cols-4 items-center gap-4">
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

            <div className="grid grid-cols-4 items-center gap-4 pt-2">
              <Label htmlFor="batch" className="text-right">
                Select Batch
              </Label>
              <select
                id="batch"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="col-span-3 dark:bg-black"
              >
                <option value="">Choose Batch</option>
                {batchList.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4 pt-2">
              <Label htmlFor="member" className="text-right">
                Select Member
              </Label>
              <Select
                id="member"
                value={memberOptions.find(
                  (option) => option.value === memberId
                )}
                onChange={handleMemberChange}
                options={memberOptions}
                className="col-span-3"
                classNamePrefix="react-select"
              />
            </div>
            <LabelledInput
              label="Start Date"
              placeholder={"Enter Date"}
              selectedDate={startDate}
              pickDate={(date) => setStartDate(date)}
              type="Calendar"
            />
            <LabelledInput
              label="End Date"
              placeholder={"Enter Date"}
              selectedDate={endDate}
              pickDate={(date) => setEndDate(date)}
              type="Calendar"
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
