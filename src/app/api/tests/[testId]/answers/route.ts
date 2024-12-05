import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { answers } = await request.json();
    const testId = parseInt(params.testId);

    // Verify the test exists
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: { questions: true },
    });

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    // Create all answers in a transaction
    const createdAnswers = await prisma.$transaction(
      answers.map((answer: { questionId: number; text: string }) => {
        return prisma.answer.create({
          data: {
            text: answer.text,
            question: { connect: { id: answer.questionId } },
            student: { connect: { id: 1 } },
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      answers: createdAnswers,
    });
  } catch (error) {
    console.error('Error submitting answers:', error);
    return NextResponse.json(
      { error: 'Failed to submit answers' },
      { status: 500 }
    );
  }
} 