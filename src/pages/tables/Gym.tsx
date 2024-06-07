import { Skeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { useGyms } from "@/hooks";
import { useNavigate } from "react-router-dom";

export const Gym = () => {
  const { loading, gyms } = useGyms();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center text-xl my-6 underline underline-offset-8 decoration-4 decoration-accent font-semibold">
        Business Units
      </div>
      <div>
        {loading ? (
          <div className="md:mx-8">
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div className="relative overflow-x-auto border rounded-xl md:mx-8">
            <table className="w-full text-sm text-left rtl:text-right text-primary dark:text-secondary-foreground">
              <thead className="text-xs text-primary uppercase bg-gray-50 dark:bg-black dark:text-secondary-foreground border border-1">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Gym
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Branch
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Website
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Operational hours
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {gyms && gyms.length > 0 ? (
                  gyms.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-black dark:border-gray-700"
                    >
                      <td className="px-6 py-3">{item.name}</td>
                      <td className="px-6 py-3">{item.branch}</td>
                      <td className="px-6 py-3">{item.website}</td>
                      <td className="px-6 py-3">{item.address}</td>
                      <td className="px-6 py-3">{item.operationalHours}</td>
                      <td className="px-6 py-3">
                        <Button
                          variant={"outline"}
                          onClick={() => navigate(`/gym/${item.id}/menu`)}
                          size={"sm"}
                        >
                          Actions
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
        )}
      </div>
    </div>
  );
};
