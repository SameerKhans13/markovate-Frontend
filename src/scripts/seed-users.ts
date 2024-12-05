import { PrismaClient, UserType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@school.com',
      phoneNumber: '1234567890',
      type: UserType.ADMIN,
    },
  });

  // Create Teachers
  const teachers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john.smith@school.com' },
      update: {},
      create: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@school.com',
        phoneNumber: '1234567891',
        type: UserType.TEACHER,
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah.wilson@school.com' },
      update: {},
      create: {
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@school.com',
        phoneNumber: '1234567892',
        type: UserType.TEACHER,
      },
    }),
    prisma.user.upsert({
      where: { email: 'michael.brown@school.com' },
      update: {},
      create: {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@school.com',
        phoneNumber: '1234567893',
        type: UserType.TEACHER,
      },
    }),
  ]);

  // Create Students
  const students = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice.johnson@student.com' },
      update: {},
      create: {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@student.com',
        phoneNumber: '1234567894',
        type: UserType.STUDENT,
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob.williams@student.com' },
      update: {},
      create: {
        firstName: 'Bob',
        lastName: 'Williams',
        email: 'bob.williams@student.com',
        phoneNumber: '1234567895',
        type: UserType.STUDENT,
      },
    }),
    prisma.user.upsert({
      where: { email: 'carol.davis@student.com' },
      update: {},
      create: {
        firstName: 'Carol',
        lastName: 'Davis',
        email: 'carol.davis@student.com',
        phoneNumber: '1234567896',
        type: UserType.STUDENT,
      },
    }),
    prisma.user.upsert({
      where: { email: 'david.miller@student.com' },
      update: {},
      create: {
        firstName: 'David',
        lastName: 'Miller',
        email: 'david.miller@student.com',
        phoneNumber: '1234567897',
        type: UserType.STUDENT,
      },
    }),
    prisma.user.upsert({
      where: { email: 'emma.wilson@student.com' },
      update: {},
      create: {
        firstName: 'Emma',
        lastName: 'Wilson',
        email: 'emma.wilson@student.com',
        phoneNumber: '1234567898',
        type: UserType.STUDENT,
      },
    }),
  ]);

  console.log('Seeded:', {
    admin,
    teacherCount: teachers.length,
    studentCount: students.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 