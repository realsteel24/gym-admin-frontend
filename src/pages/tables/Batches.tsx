import { Skeleton } from "@/components/Skeleton";
import { useBatches } from "@/hooks";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { BatchColumns } from "./columns/BatchColumns";
import { DataTable } from "@/components/Data-table";

export const Batches = () => {
  const { id, gymId } = useParams<{ id: string; gymId: string }>();
  const { batches, loading } = useBatches({ id: id ?? "all", gymId: gymId! });
  const navigate = useNavigate();

  return (
    <div>
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white hidden md:block ml-6 hover:text-accent hover:dark:text-accent cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 14"
        onClick={() => navigate(-1)}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
        />
      </svg>
      <div className="flex justify-center text-xl my-6 underline underline-offset-8 decoration-4 decoration-accent font-semibold">
        Batches
      </div>
      {loading ? (
        <div className="md:mx-8">
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div>
          <div className="relative overflow-x-auto border rounded-xl md:mx-8">
            <DataTable columns={BatchColumns} data={batches} />
          </div>
        </div>
      )}
    </div>
  );
};

export const ViewBatches = (
  id: string,
  gymId: string,
  navigate: NavigateFunction
) => {
  console.log(id);
  navigate(`/gym/${gymId}/batches/${id}`);
};
