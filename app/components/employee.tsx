"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Department as DepartmentType } from "@/types";

interface EmployeeProps {
  departments: DepartmentType[];
  onEmployeeCreated: () => void;
}

const Employee = ({ departments, onEmployeeCreated }: EmployeeProps) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string | undefined>(
    undefined
  );

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!departmentId) {
        toast({
          title: "Error",
          description: "Please select a department.",
        });
        return;
      }
      const res = await fetch("/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address, departmentId }),
      });

      if (res.ok) {
        const employeeData = await res.json();
        setName("");
        setAddress("");
        setDepartmentId(undefined);
        toast({
          title: "Employee Created",
          description: `The employee ${employeeData.name} was created successfully.`,
        });
        onEmployeeCreated();
      } else {
        throw new Error("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      toast({
        title: "Error",
        description: "Failed to create employee. Please try again.",
      });
    }
  };

  return (
    <div>
      <Card className="w-[350px] bg-white shadow-lg rounded-lg h-full">
        <CardHeader>
          <CardTitle>Create Employee</CardTitle>
          <CardDescription>Create a new employee.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter employee's name"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={2}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Add address"
                  autoComplete="off"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <p>Select Department</p>
                <Select
                  disabled={departments.length === 0}
                  onValueChange={(value) => setDepartmentId(value)}
                  value={departmentId || ""}
                >
                  <SelectTrigger
                    className={
                      departments.length === 0
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => {
                      return (
                        <SelectItem value={department.id} key={department.id}>
                          {department.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setName("");
                    setAddress("");
                    setDepartmentId(undefined);
                  }}
                >
                  Reset
                </Button>
                <Button type="submit">Add Employee</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employee;
