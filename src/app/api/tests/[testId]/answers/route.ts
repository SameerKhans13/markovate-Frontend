import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { answers } = await request.json();
    const testId = parseInt(params.testId);

    // In a real application, you would get the studentId from the session
    const studentId = 1; // Replace with actual student ID from auth

    const createdAnswers = await prisma.$transaction(
      answers.map((answer: { questionId: number; text: string }) =>
        prisma.answer.create({
          data: {
            text: answer.text,
            questionId: answer.questionId,
            studentId,
          },
        })
      )
    );

    return NextResponse.json({
      message: "Answers submitted successfully",
      success: true,
      answers: createdAnswers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 