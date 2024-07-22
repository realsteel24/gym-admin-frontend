import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { debounce } from "lodash";
import { MemberOptions } from "@/hooks";
import { BACKEND_URL } from "@/config";
import { useSearchParams } from "react-router-dom";

interface SelectMemberProps {
  gymId: string;
  onSelect: (memberId: string) => void;
  className: string;
  id: string;
}

const SelectMember: React.FC<SelectMemberProps> = ({
  gymId,
  onSelect,
  className,
  id,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
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
  }, [debouncedFetchMembers]);

  const memberOptions = members
    .filter((member) => member.Members && member.Members.length > 0)
    .map((member) => ({
      value: member.Members[0].id,
      label: member.name,
    }));

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:
        localStorage.getItem("darkMode") === "true" ? "black" : "white",
      color: localStorage.getItem("darkMode") === "true" ? "white" : "black", // text color
      border: state.isFocused ? `1px solid white` : `1px solid black`, // border color
      boxShadow: state.isFocused ? `0 0 0 2px rgba(255, 255, 255, 0.5)` : null, // focus style
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(0, 0, 0, 0.3)"
        : localStorage.getItem("darkMode") === "true"
        ? "black"
        : "white", // selected background color
      color:
        state.isSelected && localStorage.getItem("darkMode") === "true"
          ? "white" // selected text color in dark mode
          : localStorage.getItem("darkMode") === "true"
          ? "white" // default text color in dark mode
          : "black", // default text color in light mode
      ":hover": {
        backgroundColor: "gray", // hover background color
        color: "black",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: localStorage.getItem("darkMode") === "true" ? "white" : "black", // text color for selected value
    }),
  };

  return (
    <Select
      id={id}
      styles={customStyles}
      className={className}
      options={memberOptions}
      isLoading={loading}
      onInputChange={(inputValue) =>
        setSearchParams({ search: inputValue || "" })
      }
      onChange={(selectedOption) => {
        if (selectedOption) {
          onSelect(selectedOption.value); // Pass memberId to parent onSelect function
        }
      }}
      placeholder="Select Member..."
    />
  );
};

export default SelectMember;
