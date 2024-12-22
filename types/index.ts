export interface Department {
  id: string; // The unique identifier for the department (e.g., UUID or database ID)
  name: string; // The name of the department
  description: string; // A short description of the department
}

export interface Employee {
  id: string;
  name: string;
  address: string;
  departmentId: string;
}
