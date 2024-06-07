import { Skeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { useMembers } from "@/hooks";
import dateFormat from "dateformat";

import { NavigateFunction, useParams } from "react-router-dom";

export const Members = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const { members, loading } = useMembers({
    gymId: gymId!,
  });

  return (
    <div>
      <div className="flex justify-center text-xl my-6 underline underline-offset-8 decoration-4 decoration-accent">
        Member Details
      </div>
      {loading ? (
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
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contact Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Batch
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Enrollment Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Birth Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {members && members.length > 0 ? (
                  members.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-black dark:border-gray-700"
                    >
                      <td className="px-6 py-3">{item.name}</td>
                      <td className="px-6 py-3">{item.email}</td>
                      <td className="px-6 py-3">{item.contact}</td>
                      <td className="px-6 py-3">
                        {item.Members[0].MemberPrograms[0].Program.name}
                      </td>
                      <td className="px-6 py-3">
                        {item.Members[0].MemberPrograms[0].Batch.name}
                      </td>
                      <td className="px-6 py-3">
                        {dateFormat(
                          item.Members[0].enrollmentDate,
                          "dd/mm/yyyy"
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {dateFormat(item.dob, "dd/mm/yyyy")}
                      </td>

                      <td className="px-6 py-3">
                        <Button
                          onClick={() => {}}
                          size={"sm"}
                          variant={"outline"}
                        >
                          View Payments
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

export const ViewMembers = (gymId: string, navigate: NavigateFunction) => {
  navigate(`/gym/${gymId}/members`);
};
