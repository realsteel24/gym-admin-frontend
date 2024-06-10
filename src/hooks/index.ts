import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface MemberOptions {
  id: string;
  name: string;
  email: string;
  dob: string;
  contact: string;
  Members: {
    id: string;
    enrollmentDate: string;
    gymId: string;
    MemberPrograms: {
      Program: { name: string };
      programId: string;
      batchId: string;
      Batch: { name: string };
    }[];
  }[];
}

export interface GymOptions {
  id: string;
  name: string;
  branch: string;
  address: string;
  website: string;
  operationalHours: string;
}

export interface ProgramsOptions {
  id: string;
  name: string;
  description: string;
  _count: {
    Batches: number;
    MemberPrograms: number;
  };
}
export interface BatchOptions {
  id: string;
  name: string;
  endTime: string;
  startTime: string;
  days: string;
  _count: {
    MemberPrograms: number;
  };
  Program: {
    name: string;
  };
  MemberPrograms: { Member: { User: { name: string } } };
}

export interface FeeOptions {
  id: string;
  frequency: string;
  amount: number;
  description: string;
  _count: {
    MemberFees: number;
  };
}

export interface MemberProgramOptions {
  id: string;
  memberId: string;
  programId: string;
  batchId: string;
  gymId: string;

  Member: {
    0: {
      userId: string;
      MemberFees: {
        0: {
          feeCategoryId: string;
          FeeCategories: { 0: { description: string } };
          Payments: {
            0: { amount: number; paymentDate: string; paymentMethd: string };
          };
        };
      };
      User: { 0: { name: string } };
    };
  };
  Program: { 0: { name: string } };
}

export interface MemberFeeOptions {
  id: string;
  paidDate: string;
  dueDate: string;
  status: string;
  FeeCategory: { description: true; frequency: true };
  Payments: { 0: { amount: true } };
  Member: {
    User: { name: string; contact: string };
    MemberPrograms: {
      0: {
        Batch: { name: true };
        Program: { name: true };
      };
    };
  };
}

export const useMembers = ({ gymId }: { gymId: string }) => {
  const [loading, setLoading] = useState(true);
  const [dummy, render] = useState(0);
  const [members, setMembers] = useState<MemberOptions[]>([]);

  useEffect(() => {
    if (!gymId) return;
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/admin/${gymId}/members`,
          {
            headers: { authorization: localStorage.getItem("token") ?? "" },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setMembers(result.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [gymId, dummy]);

  return {
    members,
    loading,
    dummy,
    render,
  };
};

export const useGyms = () => {
  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState<GymOptions[]>([]);
  useEffect(() => {
    try {
      fetch(`${BACKEND_URL}/api/v1/gym/gyms`, {
        headers: {
          authorization: localStorage.getItem("token") ?? "",
        },
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setGyms(result.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(`Error:${error}`);
    }
  }, []);
  return {
    gyms,
    loading,
  };
};
export const usePrograms = ({ gymId }: { gymId: string }) => {
  const [programLoading, setProgramLoading] = useState(true);
  const [programs, setPrograms] = useState<ProgramsOptions[]>([]);
  useEffect(() => {
    try {
      fetch(`${BACKEND_URL}/api/v1/admin/${gymId}/programs`, {
        headers: { authorization: localStorage.getItem("token") ?? "" },
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setPrograms(result.data);
        setProgramLoading(false);
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }, [gymId]);
  return {
    programs,
    programLoading,
  };
};

export const useBatches = ({ id, gymId }: { id: string; gymId: string }) => {
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState<BatchOptions[]>([]);

  useEffect(() => {
    if (!id) {
      setBatches([]);
      setLoading(false);
      return;
    }
    const fetchBatches = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/admin/${gymId}/batches/${id}`,
          {
            headers: { authorization: localStorage.getItem("token") ?? "" },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setBatches(result.batch);
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [id]);

  return {
    batches,
    loading,
  };
};

export const useFeeCategories = ({ gymId }: { gymId: string }) => {
  const [feeCategoryLoading, setLoading] = useState(true);
  const [feeCategories, setFeeCategories] = useState<FeeOptions[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/admin/${gymId}/feeCategories`,
          {
            headers: { authorization: localStorage.getItem("token") ?? "" },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setFeeCategories(result.feeCategory);
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [gymId]);

  return {
    feeCategories,
    feeCategoryLoading,
  };
};

//Backend query disabled
export const useMemberPrograms = ({ gymId }: { gymId: string }) => {
  const [memberProgramLoading, setMemberProgramLoading] = useState(true);
  const [memberPrograms, setMemberPrograms] = useState<MemberProgramOptions[]>(
    []
  );

  useEffect(() => {
    const fetchMemberPrograms = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/admin/${gymId}/memberPrograms`,
          {
            headers: { authorization: localStorage.getItem("token") ?? "" },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setMemberPrograms(result.memberProgram);
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setMemberProgramLoading(false);
      }
    };

    fetchMemberPrograms();
  }, [gymId]);

  return {
    memberPrograms,
    memberProgramLoading,
  };
};

export const useMemberFees = ({ gymId }: { gymId: string }) => {
  const [memberFeesLoading, setMemberFeesLoading] = useState(true);
  const [memberFees, setMemberFees] = useState<MemberFeeOptions[]>([]);

  useEffect(() => {
    const fetchMemberFees = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/admin/${gymId}/memberFees`,
          {
            headers: { authorization: localStorage.getItem("token") ?? "" },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setMemberFees(result.memberFees);
        console.log(result);
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setMemberFeesLoading(false);
      }
    };

    fetchMemberFees();
  }, [gymId]);

  return {
    memberFees,
    memberFeesLoading,
  };
};

// export const useBatchMembers = ({ id, gymId }: { id: string; gymId: string }) => {
//   const [loading, setLoading] = useState(true);
//   const [batches, setBatches] = useState<BatchOptions[]>([]);

//   useEffect(() => {
//     if (!id) {
//       setBatches([]);
//       setLoading(false);
//       return;
//     }
//     const fetchBatches = async () => {
//       try {
//         const response = await fetch(
//           `${BACKEND_URL}/api/v1/admin/${gymId}/batches/${id}`,
//           {
//             headers: { authorization: localStorage.getItem("token") ?? "" },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Something went wrong");
//         }
//         const result = await response.json();
//         setBatches(result.batch);
//       } catch (error) {
//         console.error("Error fetching batches:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBatches();
//   }, [id]);

//   return {
//     batches,
//     loading,
//   };
// };
