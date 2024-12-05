import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = searchParams.get('testId');

    if (!testId) {
      return NextResponse.json(
        { error: 'Test ID is required' },
        { status: 400 }
      );
    }

    // Fetch all answers and their results for the given test
    const answers = await prisma.answer.findMany({
      where: {
        question: {
          testId: parseInt(testId)
        }
      },
      include: {
        question: true,
        result: true
      }
    });

    // Calculate total scores
    let totalScore = 0;
    let totalPossible = 0;

    // Transform the data for the frontend
    const results = answers.map(answer => {
      totalScore += answer.result?.score || 0;
      totalPossible += answer.question.marks;

      return {
        id: answer.result?.id,
        score: answer.result?.score || 0,
        feedback: answer.result?.feedback || '',
        answer: {
          id: answer.id,
          text: answer.text,
          marks: answer.marks,
          question: {
            id: answer.question.id,
            text: answer.question.text,
            correctAnswer: answer.question.correctAnswer,
            marks: answer.question.marks
          }
        }
      };
    });

    return NextResponse.json({
      results,
      totalScore,
      totalPossible
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
} 