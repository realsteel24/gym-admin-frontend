import { Skeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { useFeeCategories } from "@/hooks";
import { useState } from "react";

import { NavigateFunction, useParams } from "react-router-dom";

export const FeeCategories = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const { feeCategories, feeCategoryLoading } = useFeeCategories({
    gymId: gymId!,
  });
  const [counter, setCounter] = useState(0);

  return (
    <div>
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
            <table className="w-full text-sm text-left rtl:text-right text-primary dark:text-secondary-foreground">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black border-y dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time Period
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody key={counter}>
                {feeCategories.length > 0 ? (
                  feeCategories.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-black dark:border-gray-700"
                    >
                      <td className="px-6 py-3">{item.description}</td>
                      <td className="px-6 py-3">{item.amount}</td>
                      <td className="px-6 py-3">{item.frequency}</td>
                      <td className="px-6 py-3">{item._count.MemberFees}</td>

                      <td className="px-6 py-3">
                        <Button
                          onClick={() => {
                            setCounter((prev) => prev + 1);
                          }}
                          size={"sm"}
                          variant={"outline"}
                        >
                          View Payers
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-3 text-center">
                      No Categories available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
