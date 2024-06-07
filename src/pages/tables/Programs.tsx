import { Skeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { usePrograms } from "@/hooks";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ViewBatches } from "./Batches";

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
        <div>
          <div className="relative overflow-x-auto md:mx-8 border rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-primary dark:text-secondary-foreground">
              <thead className="text-xs text-primary uppercase bg-gray-50 dark:bg-black dark:text-secondary-foreground border border-1">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Program Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Batches
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Member Count
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {programs.length > 0 ? (
                  programs.map((item) => (
                    <tr key={item.id} className="bg-white border dark:bg-black">
                      <td className="px-6 py-3">{item.name}</td>
                      <td className="px-6 py-3">{item._count.Batches}</td>
                      <td className="px-6 py-3">
                        {item._count.MemberPrograms}
                      </td>
                      <td className="px-6 py-3">
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            ViewBatches(item.id, gymId ?? "01", navigate)
                          }
                          size={"sm"}
                        >
                          View Batches
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-3 text-center">
                      No programs available
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

export const ViewPrograms = (gymId: string, navigate: NavigateFunction) => {
  console.log(gymId);
  navigate(`/gym/${gymId}/programs`);
};
