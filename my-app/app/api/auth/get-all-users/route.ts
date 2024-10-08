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

export async function PATCH(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    const {  verifyEmail } = await req.json(); 

    if (!id || typeof id !== 'string') {
        return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: { verifyEmail }, 
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating user verification status:", error);
        return NextResponse.json({ message: 'Error updating user verification status' }, { status: 500 });
    }
}


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


export const PUT = async (req: NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const body = await req.json();
        const { verifyEmail } = body;

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        if (typeof verifyEmail !== 'boolean') {
            return NextResponse.json({ error: 'Invalid or missing verifyEmail value' }, { status: 400 });
        }

        // Log the inputs to check if they're coming through properly
        console.log(`Updating user with ID: ${id}, verifyEmail: ${verifyEmail}`);

        const updatedUser = await prisma.user.update({
            where: { id: id as string },
            data: { verifyEmail }, 
        });

        console.log('User successfully updated:', updatedUser);

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Failed to update user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


