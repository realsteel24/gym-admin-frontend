import { DataTable } from "@/components/Data-table";
import { Skeleton } from "@/components/Skeleton";
import { usePrograms } from "@/hooks";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ProgramColumns } from "./columns/ProgramColumns";

export const Programs = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const { programLoading, programs } = usePrograms({ gymId: gymId! });
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center text-xl my-6 underline underline-offset-8 decoration-4 decoration-accent font-semibold">
        Mohan's Planet, Head Quarters
      </div>
      {programLoading ? (
        <div className="md:mx-8">
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="relative overflow-x-auto md:mx-8 border rounded-xl">
          <DataTable
            columns={ProgramColumns(navigate, gymId!)}
            data={programs}
          />
        </div>
      )}
    </div>
  );
};

export const ViewPrograms = (gymId: string, navigate: NavigateFunction) => {
  console.log(gymId);
  navigate(`/gym/${gymId}/programs`);
};
