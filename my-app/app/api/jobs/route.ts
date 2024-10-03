/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const jobs = await prisma.jobs.findMany();
        return NextResponse.json(jobs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, description, location, salary, employmentType, jobLevel, requirements, user } = await req.json();
        const newJob = await prisma.jobs.create({
            data: {
                title,
                description,
                location,
                salary,
                employmentType,
                jobLevel,
                requirements,
                user,
            },
        });
        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, title, description } = await req.json();
        const updatedJob = await prisma.jobs.update({
            where: { id: id.toString() },
            data: {
                title,
                description,
            },
        });
        return NextResponse.json(updatedJob);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await prisma.jobs.delete({
            where: { id: id.toString() },
        });
        return NextResponse.json({ message: 'Job deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
    }
}
