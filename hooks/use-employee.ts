"use client";
import { useEffect, useState } from "react";
import { Employee as EmployeeType } from "@/types";

export function useEmployee() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/employee");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch employees. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { employees, fetchEmployees, isLoading };
}
