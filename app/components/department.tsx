"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface DepartmentProps {
  onDepartmentCreated: () => void; // Callback to notify parent
}

const Department = ({ onDepartmentCreated }: DepartmentProps) => {
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: department, description }),
      });
      if (res.ok) {
        const departmentData = await res.json();
        setDepartment("");
        setDescription("");
        toast.success(
          `The department ${departmentData.name} was created successfully.`
        );
        onDepartmentCreated();
      } else {
        throw new Error("Failed to create department");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Failed to create department.",
      });
    }
  };
  return (
    <div>
      <Card className="w-[350px] bg-white shadow-lg rounded-lg h-full">
        <CardHeader>
          <CardTitle>Create Department</CardTitle>
          <CardDescription>Create a new department</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col justify-between"
          >
            <div className="flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col space-y-1.5 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter department's name"
                    autoComplete="off"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    minLength={2}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Add description"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setDepartment("");
                    setDescription("");
                  }}
                >
                  Reset
                </Button>
                <Button type="submit">Add Department</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Department;
