// Example backend handler (e.g., in a Next.js API route)
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface EmployeeRequestBody {
  name: string;
  address: string;
  departmentId: string;
}

export async function POST(req: Request) {
  try {
    const body: EmployeeRequestBody = await req.json();
    const { name, address, departmentId } = body;
    const employee = await prisma.employee.create({
      data: {
        name,
        address,
        departmentId,
      },
    });
    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const departmentId = searchParams.get("departmentId");

    const employees = await prisma.employee.findMany({
      where: {
        AND: [
          name
            ? { name: { contains: name as string, mode: "insensitive" } }
            : {},
          departmentId ? { departmentId: departmentId as string } : {},
        ],
      },
      include: {
        department: true, // Include related department data
      },
    });

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees." },
      { status: 500 }
    );
  }
}
