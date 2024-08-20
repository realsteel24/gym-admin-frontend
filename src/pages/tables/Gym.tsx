import { DataTable } from "@/components/Data-table";
import { Skeleton } from "@/components/Skeleton";
import { useGyms } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { GymColumns } from "./columns/GymColumns";

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
            <DataTable
              columns={GymColumns}
              data={gyms.map((gym) => ({ ...gym, navigate }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};
