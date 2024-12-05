import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/students - Get all students
export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: {
        type: 'STUDENT'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST /api/students - Create a new student
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, grade } = body;

    if (!firstName || !lastName || !email || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const student = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        type: 'STUDENT'
      }
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A student with this email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
} 