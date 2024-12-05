import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { questions } = await request.json();
    const testId = parseInt(params.testId);

    const createdQuestions = await prisma.question.createMany({
      data: questions.map((q: any) => ({
        ...q,
        testId,
        type: "SHORT_ANSWER",
      })),
    });

    return NextResponse.json({
      message: "Questions added successfully",
      success: true,
      questions: createdQuestions,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 