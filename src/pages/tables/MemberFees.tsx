import { Skeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { useMemberFees } from "@/hooks";
import dateFormat from "dateformat";

import { NavigateFunction, useParams } from "react-router-dom";

export const MemberFees = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const { memberFees, memberFeesLoading } = useMemberFees({
    gymId: gymId!,
  });
  const checkAndUpdateStatus = (dueDate: string, status: string) => {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    if (dueDateObj < today) {
      return "Pending";
    }
    return status;
  };

  return (
    <div>
      <div className="flex justify-center text-xl my-6 underline underline-offset-8 decoration-4 decoration-accent">
        Member Details
      </div>
      {memberFeesLoading ? (
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
                    Package
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount Paid
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Due date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {memberFees && memberFees.length > 0 ? (
                  memberFees.map((item) => {
                    const status = checkAndUpdateStatus(
                      item.dueDate,
                      item.status
                    );
                    return (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-black dark:border-gray-700"
                      >
                        <td className="px-6 py-3">{item.Member.User.name}</td>
                        <td className="px-6 py-3">
                          {item.FeeCategory.description}
                        </td>
                        <td className="px-6 py-3">{item.Payments[0].amount}</td>
                        <td className="px-6 py-3">
                          {dateFormat(item.paidDate, "dd/mm/yyyy")}
                        </td>
                        <td className="px-6 py-3">
                          {dateFormat(item.dueDate, "dd/mm/yyyy")}
                        </td>
                        <td
                          className={`px-6 py-3 ${
                            status === "Pending"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {status}
                        </td>
                        <td className="px-6 py-3">
                          <Button
                            onClick={() => {}}
                            size={"sm"}
                            variant={"outline"}
                          >
                            View Payment Details
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-3 text-center">
                      No Members available
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

export const ViewMemberFees = (gymId: string, navigate: NavigateFunction) => {
  navigate(`/gym/${gymId}/memberFees`);
};
