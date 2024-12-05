import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/students/[id] - Get a single student
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const student = await prisma.user.findUnique({
      where: { id }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}

// PUT /api/students/[id] - Update a student
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, grade } = body;

    const updatedStudent = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
      }
    });

    return NextResponse.json(updatedStudent);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A student with this email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

// DELETE /api/students/[id] - Delete a student
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.user.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
} 