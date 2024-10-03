import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return NextResponse.json({ message: 'Invalid credentials' });
      }

      if (!process.env.JWT_SECRET) {
        return NextResponse.json({ message: 'Server configuration error' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return new NextResponse(JSON.stringify({ message: 'Login successful', user: { ...user, password: undefined } }), {
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Server error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}
