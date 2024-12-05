import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { QuestionType } from "@prisma/client";

interface QuestionInput {
  text: string;
  marks: number;
  type: QuestionType;
  correctAnswer: string;
  options: string[];
}

export async function POST(
  request: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { questions } = await request.json();
    const testId = parseInt(params.testId);

    // Validate testId
    const test = await prisma.test.findUnique({
      where: { id: testId },
    });

    if (!test) {
      return NextResponse.json(
        { error: "Test not found" },
        { status: 404 }
      );
    }

    // Create all questions in a transaction
    const createdQuestions = await prisma.$transaction(
      questions.map((q: QuestionInput) =>
        prisma.question.create({
          data: {
            text: q.text,
            type: q.type,
            marks: q.marks,
            options: q.options || [],
            correctAnswer: q.correctAnswer,
            testId: testId,
          },
        })
      )
    );

    return NextResponse.json({
      message: "Questions added successfully",
      success: true,
      questions: createdQuestions,
    });
  } catch (error: any) {
    console.error("Error creating questions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create questions" },
      { status: 500 }
    );
  }
} 