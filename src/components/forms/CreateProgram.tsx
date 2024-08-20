import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/config";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomDialogForm } from "../CustomDialogForm";
import { LabelledInput } from "../LabelledInput";
import { useToast } from "../ui/use-toast";

export const CreateProgram = () => {
  const [name, setName] = useState("Kickboxing");
  const [description, setDescription] = useState(
    "Martial Arts is a way of life"
  );
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { gymId } = useParams<{ gymId: string }>();
  const clear = () => {
    setName("");
    setDescription("");
    setError("");
    setIsDialogOpen(false);
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/admin/${gymId}/programs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") ?? "",
          },
          body: JSON.stringify({
            name: name,
            description: description,
          }),
        }
      );

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Something went wrong!");
      }

      const res = await response.json();
      console.log(res);
      toast({
        title: "Program successfully created",
        description: "Success",
      });
      navigate(`/gym/${gymId}/menu`);
      clear();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else setError("An unexpected error occurred");
    }
  };
  return (
    <div>
      <CustomDialogForm
        isOpen={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(!isDialogOpen)}
        FormTitle="Create a Program"
        FormDescription=" Please add all the necessary fields and click save"
        drawerTitle="Create a Program"
        drawerDescription=" Please add all the necessary fields and click save"
        titleButton="Create Program"
        children={
          <div>
            <LabelledInput
              formId="Program"
              formName="Program"
              label="Program"
              placeholder="Program Name"
              defaultValue="Kickboxing"
              onChange={(e) => setName(e.target.value)}
            />
            <LabelledInput
              formId="Description"
              formName="Description"
              label="Description"
              placeholder="Description"
              defaultValue="Martial Arts is a way of life"
              onChange={(e) => setDescription(e.target.value)}
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
