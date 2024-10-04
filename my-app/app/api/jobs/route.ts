/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(_request: NextRequest) {
  try {
    const jobs = await prisma.jobs.findMany({
      orderBy: { createdAt: "desc" }, 
      include: {
        user: {
          select: {
            id: true,
            name: true,
            createdOrg: true,  
            industryType: true,
            totalEmployee: true,
            description: true,
            address: true,
            province: true,
            city: true,
            district: true,
            postalCode: true,
          },
        },
      },
    });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, salary, employmentType, jobLevel, skills, requirements, keywords, userId } = body;

    if (!title || !description || !location || !employmentType || !jobLevel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const job = await prisma.jobs.create({
      data: {
        title,
        description,
        location,
        salary,
        employmentType,
        jobLevel,
        skills: skills || null,
        requirements: requirements || null,
        keywords: keywords || null,
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating job" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const body = await request.json();
    const jobExists = await prisma.jobs.findUnique({ where: { id } });

    if (!jobExists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const updatedJob = await prisma.jobs.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        salary: body.salary,
        employmentType: body.employmentType,
        jobLevel: body.jobLevel,
        skills: body.skills || null,
        requirements: body.requirements || null,
        keywords: body.keywords || null,
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating job" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  try {
    const jobExists = await prisma.jobs.findUnique({ where: { id: id || undefined } });

    if (!jobExists) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await prisma.jobs.delete({ where: { id : id || undefined } });
    return NextResponse.json({ message: "Job deleted successfully" }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting job" }, { status: 500 });
  }
}
