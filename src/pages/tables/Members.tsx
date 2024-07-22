import { DataTable } from "@/components/Data-table";
import { Skeleton } from "@/components/Skeleton";
import { useMembers } from "@/hooks";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { MemberColumns } from "./columns/MemberColumns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export const Members = () => {
  const { gymId, id } = useParams<{ gymId: string; id: string }>();
  const { members, loading } = useMembers({
    gymId: gymId!,
    id: id ?? "all",
  });
  const navigate = useNavigate();
  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const formattedMembers = members.map((item) => {
    const memberDetail = item.Members[0];
    const memberProgram = memberDetail?.MemberPrograms[0];
    const programName = memberProgram?.Program?.name || "N/A";
    const batchName = memberProgram?.Batch?.name || "N/A";
    const enrollmentDate = memberDetail?.enrollmentDate || null;
    const dob = item.dob || null;

    return {
      ...item,
      programName,
      batchName,
      enrollmentDate,
      dob,
    };
  });
  console.log(Math.round(formattedMembers.length));
  const totalPages = Math.ceil(formattedMembers.length / rowsPerPage);
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return formattedMembers.slice(startIndex, endIndex);
  };
  const handlePageChange = (PageNumber: number) => {
    setCurrentPage(PageNumber);
  };
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
        Member Details
      </div>
      {loading ? (
        <div className="md:mx-8">
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="relative overflow-x-auto border rounded-xl md:mx-8">
          <DataTable columns={MemberColumns} data={getPaginatedData()} />
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {[...Array(totalPages).keys()].map((page) => (
            <PaginationItem key={page + 1}>
              <PaginationLink
                className={currentPage === page + 1 ? "active" : undefined}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export const ViewMembers = (
  id: string,
  gymId: string,
  navigate: NavigateFunction
) => {
  navigate(`/gym/${gymId}/members/${id}`);
};
