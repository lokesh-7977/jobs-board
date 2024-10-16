/* eslint-disable @typescript-eslint/no-unused-vars */
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
                city: true,
                ssc: true,
                sscper: true,
                inter: true,
                interper: true,
                degree: true,
                degreeper: true,
                resume: true,
                role: true,
                utr: true,
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const body = await req.json();
        const {
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
            verifyEmail,
            role,
            utr,
        } = body;

        if (verifyEmail !== undefined && typeof verifyEmail !== "boolean") {
            return NextResponse.json({ error: "verifyEmail must be a boolean" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
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
                verifyEmail,
                role,
                utr,
            },
        });

        console.log("Updated user:", updatedUser);
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req: NextRequest) => {
    const { name, email, city, ssc, sscper, inter, interper, degree, degreeper, resume } = await req.json(); 

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            // Update user
            const user = await prisma.user.update({
                where: { email }, 
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


export const DELETE = async (req: NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const user = await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}