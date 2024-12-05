import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { answerId } = await request.json();

    // Fetch the answer and related question
    const answer = await prisma.answer.findUnique({
      where: { id: answerId },
      include: {
        question: true,
      },
    });

    if (!answer) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }

    // Prepare the prompt for GPT
    const prompt = `
      Question: ${answer.question.text}
      Correct Answer: ${answer.question.correctAnswer}
      Student's Answer: ${answer.text}
      
      Compare the student's answer with the correct answer and:
      1. Provide a score between 0 and ${answer.question.marks} based on accuracy
      2. Provide brief feedback explaining the score
      
      Return the response in JSON format:
      {
        "score": number,
        "feedback": "explanation"
      }
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert teacher evaluating student answers. Be fair and consistent in your scoring."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);

    // Create or update the result in database
    const result = await prisma.result.upsert({
      where: {
        answerId: answer.id,
      },
      update: {
        score: response.score,
        feedback: response.feedback,
      },
      create: {
        answerId: answer.id,
        score: response.score,
        feedback: response.feedback,
      },
    });

    // Update the answer's marks
    await prisma.answer.update({
      where: { id: answer.id },
      data: {
        marks: Math.round(response.score),
        isCorrect: response.score === answer.question.marks,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error scoring answer:', error);
    return NextResponse.json(
      { error: 'Failed to score answer' },
      { status: 500 }
    );
  }
} 