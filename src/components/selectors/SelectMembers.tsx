import React, { useEffect, useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { debounce } from "lodash";
import { MemberOptions } from "@/hooks";
import { BACKEND_URL } from "@/config";
import { useSearchParams } from "react-router-dom";
import { Label } from "../ui/label";

interface SelectMemberProps {
  gymId: string;

  id: string;
  memberId: string;
  setMemberId: (memberId: string) => void;
}

const SelectMember: React.FC<SelectMemberProps> = ({
  gymId,
  memberId,
  setMemberId,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [members, setMembers] = useState<MemberOptions[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchMembers = async (search: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/admin/${gymId}/members/select?search=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") ?? "",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.data) {
        setMembers(data.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchMembers = useCallback(
    debounce((search: string) => {
      fetchMembers(search);
    }, 800),
    [gymId]
  );

  useEffect(() => {
    const search = searchParams.get("search") || "";
    debouncedFetchMembers(search);
  }, [search, debouncedFetchMembers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchParams({ search: e.target.value });
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4 py-2">
      <Label htmlFor="members" className="text-right">
        Member
      </Label>
      <Select
        onValueChange={(value) => {
          setMemberId(value);
          setSearchParams("");
        }}
      >
        <SelectTrigger className={`col-span-3`} id={memberId}>
          <SelectValue placeholder="Select Member" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <input
              placeholder="Search Members"
              className="p-2 w-full"
              type="text"
              onChange={handleSearchChange}
              value={search}
            />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : members.length === 0 ? (
            <div className="text-sm opacity-80 p-1">No options available</div>
          ) : (
            members.map((member) => (
              <SelectItem
                value={member.Members[0].id}
                key={member.Members[0].id}
              >
                {member.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMember;
