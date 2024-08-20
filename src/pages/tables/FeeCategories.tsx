import { DataTable } from "@/components/Data-table";
import { Skeleton } from "@/components/Skeleton";
import { useFeeCategories } from "@/hooks";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { FeeCategoryColumns } from "./columns/FeeCategoryColumns";

export const FeeCategories = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const { feeCategories, feeCategoryLoading, fetchCategories } =
    useFeeCategories({
      gymId: gymId!,
    });
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    fetchCategories()
  }, [gymId])

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
      <div className="flex justify-center text-xl my-6 underline underline-offset-8 decoration-4 decoration-accent">
        Fee Categories
      </div>
      {feeCategoryLoading ? (
        <div className="md:mx-8">
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div>
          <div className="relative overflow-x-auto border rounded-xl md:mx-8">
            <DataTable
              columns={FeeCategoryColumns}
              data={feeCategories.map((item) => ({
                ...item,
                counter,
                setCounter,
              }))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const ViewFeeCategories = (
  gymId: string,
  navigate: NavigateFunction
) => {
  
  navigate(`/gym/${gymId}/feeCategories`);
};
