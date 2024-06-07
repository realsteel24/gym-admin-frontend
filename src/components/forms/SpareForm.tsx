import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/config";
import { useState } from "react";

export function SpareForm() {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const clear = () => {
    setName("");
    setDays("");
    setError("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = async () => {
    setError(""); // Clear any previous error message
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/gym/batches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          days: days,
          startTime: startTime,
          endTime: endTime,
        }),
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Something went wrong!");
      }

      const res = await response.json();
      console.log(res);
      clear(); // Clear the form fields after successful submission
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else setError("An unexpected error occurred");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create New Batch</CardTitle>
        <CardDescription>Fill in the details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Batch Name</Label>
              <Input
                id="name"
                placeholder="Eg. Kickboxing"
                value={name} // Controlled input
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="days">Days</Label>
              <Input
                id="days"
                placeholder="Days in a week"
                defaultValue={"Mon-Wed-Fri"}
                value={days} // Controlled input
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                placeholder="When does it start?"
                defaultValue={"8:00 PM"}
                value={startTime} // Controlled input
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                placeholder="End time"
                defaultValue={"9:00 PM"}
                value={endTime} // Controlled input
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clear}>
          Clear
        </Button>
        <Button onClick={handleSubmit} variant={"outline"}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
