import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export const GET = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                verifyEmail: true,
                city : true,
                role: true,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 }); 
    } finally {
        await prisma.$disconnect();
    }
};

export const DELETE = async (req : NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 }); 
        }

        await prisma.user.delete({
            where: { id: id as string },
        });

        return NextResponse.json({ message: 'User deleted' }); 
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 }); 
    } finally {
        await prisma.$disconnect();
    }
};

export const PUT = async (req : NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const body = await req.json();
        const { name, email, verifyEmail, city, role } = body;

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 }); 
        }

        const updatedUser = await prisma.user.update({
            where: { id: id as string },
            data: { name, email, verifyEmail, city, role },
        });

        return NextResponse.json(updatedUser); 
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 }); 
    } finally {
        await prisma.$disconnect();
    }
};

