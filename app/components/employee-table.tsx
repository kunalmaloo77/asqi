import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Department as DepartmentType,
  Employee as EmployeeType,
} from "@/types";
import { Loader2 } from "lucide-react";

interface EmployeeProps {
  employees: EmployeeType[];
  departments: DepartmentType[];
  isLoading?: boolean;
}

const EmployeeTable = ({
  employees,
  departments,
  isLoading,
}: EmployeeProps) => {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>Employee Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Serial No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => {
            const employeeDepartment = departments.find(
              (department) => department.id === employee.departmentId
            );
            return (
              <TableRow key={employee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell className="text-right">
                  {employeeDepartment?.name}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
