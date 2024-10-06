/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/../lib/prisma";

export async function GET() {
    try {
        const jobs = await prisma.jobs.findMany();
        return NextResponse.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { 
            title, 
            description, 
            location, 
            salary, 
            employmentType, 
            jobLevel,
            image,            
            userId 
        } = body;

        const newJob = await prisma.jobs.create({
            data: {
                title,
                description,
                location,
                salary,
                employmentType,
                jobLevel,
                image,         
                user: { 
                    connect: { id: userId }
                }
            },
        });

        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const body = await req.json();
        const {
            title,
            description,
            location,
            salary,
            image,        
            employmentType,
            jobLevel         
        } = body;

        if (!id) {
            return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
        }

        const updatedJob = await prisma.jobs.update({
            where: {
                id: id as string,
            },
            data: {
                title,
                description,
                location,
                salary,
                image,       
                employmentType,
                jobLevel,
            },
        });

        return NextResponse.json(updatedJob, { status: 200 });
    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json({ error: 'Error updating job' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
        }

        await prisma.jobs.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ error: 'Error deleting job' }, { status: 500 });
    }
}
