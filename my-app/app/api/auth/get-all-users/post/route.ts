import {  NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 


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
            return NextResponse.json([], { status: 200 }); 
        }

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
