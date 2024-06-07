import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateProgram } from "../forms/CreateProgram";
import { ViewPrograms } from "@/pages/tables/Programs";
import { useNavigate, useParams } from "react-router-dom";

export function InstructorCard() {
  const { gymId } = useParams<{ gymId: string }>();
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-4 mx-6 my-6">
        <div className="col-span-1">
          <Card className="w-full h-full min-h-[200px] dark:bg-black flex flex-col">
            <div className="flex flex-col flex-1 text-center items-center">
              <CardHeader>
                <CardTitle>Manage Programs</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                <CreateProgram />
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="w-full h-full min-h-[200px] dark:bg-black flex flex-col">
            <div className="flex flex-col  flex-1 text-center items-center">
              <CardHeader>
                <CardTitle>View all programs</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                <Button
                  variant={"outline"}
                  onClick={() => ViewPrograms(gymId ?? "", navigate)}
                >
                  View Programs
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
