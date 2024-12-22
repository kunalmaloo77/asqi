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

interface EmployeeProps {
  employees: EmployeeType[];
  departments: DepartmentType[];
}

const EmployeeTable = ({ employees, departments }: EmployeeProps) => {
  console.log({ employees });
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
