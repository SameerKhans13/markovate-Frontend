import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { title, duration, totalMarks, subject } = reqBody;

    const newTest = await prisma.test.create({
      data: {
        title,
        duration,
        totalMarks,
        subject,
        description: "", // Optional field
        createdBy: {
          connect: {
            id: 1 // You should replace this with the actual teacher's ID from your auth system
          }
        }
      },
    });

    return NextResponse.json({
      message: "Test created successfully",
      success: true,
      test: newTest,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      include: {
        createdBy: true,
        questions: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({
      message: "Tests fetched successfully",
      success: true,
      tests,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 