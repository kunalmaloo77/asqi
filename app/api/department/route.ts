import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface DepartmentRequestBody {
  name: string;
  description?: string;
}

export async function POST(req: Request) {
  try {
    const body: DepartmentRequestBody = await req.json();
    const { name, description } = body;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (!description) {
      return NextResponse.json(
        { error: "Provide Description" },
        { status: 400 }
      );
    }

    const department = await prisma.department.create({
      data: { name, description },
    });

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create department" },
      { status: 500 }
    );
  }
}

//delete all departments
export async function DELETE() {
  try {
    const department = await prisma.department.deleteMany();

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete department" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const department = await prisma.department.findMany();

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}
