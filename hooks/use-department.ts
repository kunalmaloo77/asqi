"use client";
import { useState, useEffect } from "react";
import { Department as DepartmentType } from "@/types";

export function useDepartments() {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/department");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch departments. Status: ${response.status}`
        );
      }
      const data = await response.json();
      console.log(data, "<-department hook");
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { departments, fetchDepartments, isLoading };
}
