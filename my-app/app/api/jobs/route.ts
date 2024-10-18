/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; 

const jobSchema = z.object({
  name : z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(), 
  employmentType: z.string().min(1, "Employment type is required"),
  jobLevel: z.string().optional(),
  image: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),
  category: z.string().optional(),
  website: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const pageSize = Math.max(1, Number(url.searchParams.get("pageSize")) || 10);

    const jobs = await prisma.jobs.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = jobSchema.parse(body);

    const newJob = await prisma.jobs.create({
      data: {
        name: parsedBody.name,
        title: parsedBody.title,
        description: parsedBody.description,
        location: parsedBody.location,
        salary: parsedBody.salary ? Number(parsedBody.salary) : null,
        employmentType: parsedBody.employmentType,
        jobLevel: parsedBody.jobLevel || "",
        image: parsedBody.image || null,
        category: parsedBody.category || null, 
        website: parsedBody.website || null, 
        skills: parsedBody.skills || [],
        user: { connect: { id: parsedBody.userId } },
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error while creating job:", error.errors);
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Error creating job" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Job ID is required" }, { status: 400 });

    const body = await req.json();
    const parsedBody = jobSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ errors: parsedBody.error.errors }, { status: 400 });
    }

    const updatedJob = await prisma.jobs.update({
      where: { id },
      data: {
        title: parsedBody.data.title,
        description: parsedBody.data.description,
        location: parsedBody.data.location,
        salary: parsedBody.data.salary ? Number(parsedBody.data.salary) : null,
        image: parsedBody.data.image ?? null,
        employmentType: parsedBody.data.employmentType,
        jobLevel: parsedBody.data.jobLevel || "",
        category: parsedBody.data.category || null, // Handle optional field
        website: parsedBody.data.website || null, // Handle optional field
        skills: parsedBody.data.skills || [],
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Error updating job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    await prisma.jobs.delete({ where: { id } });

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Error deleting job" }, { status: 500 });
  }
}
