"use client";
import { useEffect, useState } from "react";

import EmployeeTable from "./components/employee-table";
import Department from "./components/department";
import Employee from "./components/employee";

import { useDepartments } from "@/hooks/use-department";
import { useEmployee } from "@/hooks/use-employee";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    departments,
    fetchDepartments,
    isLoading: isLoadingDepartments,
  } = useDepartments();
  const {
    employees,
    fetchEmployees,
    isLoading: isLoadingEmployee,
    setIsLoading: setIsLoadingEmployee,
  } = useEmployee();
  const [filterName, setFilterName] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleFilterChange = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(filterName && { name: filterName }),
        ...(filterDepartment &&
          filterDepartment !== "all" && {
            departmentId: filterDepartment,
          }),
      }).toString();

      const res = await fetch(`/api/employee?${queryParams}`);
      setIsLoadingEmployee(true);
      const response = await res.json();
      setFilteredEmployees(response);
      setIsLoadingEmployee(false);
      // fetchEmployees(filteredEmployees);
    } catch (error) {
      console.error("Error filtering employees:", error);
    }
  };

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-center md:space-x-20 space-y-6 md:space-y-0 items-center md:items-stretch">
        <Department
          onDepartmentCreated={fetchDepartments}
          isLoading={isLoadingDepartments}
        />
        <Employee
          departments={departments}
          onEmployeeCreated={fetchEmployees}
          isLoading={isLoadingEmployee}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center mt-6 space-y-6 md:space-y-0 md:space-x-4">
        <div>
          <Select
            value={filterDepartment}
            onValueChange={(value) => setFilterDepartment(value)}
            // className="border rounded-md px-3 py-2"
          >
            <SelectTrigger
              className={
                departments.length === 0 ? "cursor-not-allowed opacity-50" : ""
              }
            >
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>

            <SelectContent>
              {departments.map((department) => {
                return (
                  <SelectItem value={department.id} key={department.id}>
                    {department.name}
                  </SelectItem>
                );
              })}
              <SelectItem value="all">All departments</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            <Search className="h-5 w-5" />
          </span>
          <Input
            type="text"
            placeholder="Search by name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <Button onClick={handleFilterChange} variant="ghost">
          Apply Filters
        </Button>
      </div>
      <div className="mt-10">
        <EmployeeTable
          employees={filteredEmployees}
          departments={departments}
          isLoading={isLoadingEmployee}
        />
      </div>
    </div>
  );
}
