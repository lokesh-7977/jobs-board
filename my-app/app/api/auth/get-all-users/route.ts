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

export const PUT = async (req: NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get("id");
        const body = await req.json();
    
        // Destructure the body to get all the fields
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
        } = body;
    
        // Ensure the id is provided
        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }
    
        // Validate that verifyEmail is a boolean (if provided)
        if (verifyEmail !== undefined && typeof verifyEmail !== "boolean") {
            return NextResponse.json({ error: "verifyEmail must be a boolean" }, { status: 400 });
        }
    
        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { id: id },
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
            },
        });
    
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// New POST method to create a new user
export const POST = async (req: NextRequest) => {
    try {
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
        } = body;

        // Validate email uniqueness
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        // Create a new user
        const newUser = await prisma.user.create({
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
            },
        });
    
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
