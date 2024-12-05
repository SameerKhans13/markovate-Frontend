import { NextResponse } from 'next/server';
import { prisma } from './prisma';
import { UserType } from '@prisma/client';

export async function isTeacher(userId: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { type: true }
  });
  return user?.type === UserType.TEACHER;
}

export async function validateTeacher(userId: number) {
  if (!await isTeacher(userId)) {
    return NextResponse.json(
      { error: 'Only teachers can perform this action' },
      { status: 403 }
    );
  }
  return null;
} 