/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return  NextResponse.json({ message: 'Method not allowed' });
  }

  const { email, password: plainPassword, name } = req.body; 
  if (!email || !plainPassword || !name) {
    return NextResponse.json({ message: 'Email, password, and name are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return  NextResponse.json({ message: 'Email already exists' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`);

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
    });

    const { password, ...userWithoutPassword } = newUser;
    return  NextResponse.json({ message: 'Registration successful', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' });
  } finally {
    await prisma.$disconnect();
  }
}
