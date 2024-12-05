import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserType } from '@prisma/client';

// GET /api/users - Get all users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as UserType | null;

    const where = type ? { type } : {};
    
    const users = await prisma.user.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, type } = body;

    if (!firstName || !lastName || !email || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate user type
    if (!Object.values(UserType).includes(type)) {
      return NextResponse.json(
        { error: 'Invalid user type. Must be TEACHER, STUDENT, or ADMIN' },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        type
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 