import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export const POST = async (req: NextRequest) => {
    const { name, email, city, ssc, sscper, inter, interper, degree, degreeper, resume } = await req.json(); 

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }, // You can change this to another unique identifier
        });

        if (existingUser) {
            // Update user
            const user = await prisma.user.update({
                where: { email }, // Assuming email is unique
                data: {
                    name,
                    city,
                    ssc,
                    sscper,
                    inter,
                    interper,
                    degree,
                    degreeper,
                    resume,
                },
            });
            return NextResponse.json(user, { status: 200 });
        } else {
            // Create new user
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    city,
                    ssc,
                    sscper,
                    inter,
                    interper,
                    degree,
                    degreeper,
                    resume,
                },
            });
            return NextResponse.json(user, { status: 201 });
        }
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ error: 'Failed to create or update user' }, { status: 500 });
    }
}

export const GET = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                verifyEmail: true,
                city: true,
                ssc: true,
                sscper: true,
                inter: true,
                interper: true,
                degree: true,
                degreeper: true,
                resume: true,
                role: true,
            },
        });

        if (users.length === 0) {
            return NextResponse.json([], { status: 200 }); // Return an empty array if no users found
        }

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
