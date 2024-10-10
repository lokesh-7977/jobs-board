import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/../lib/prisma";

type Role = "jobSeeker" | "employer";

interface RequestBody {
  name: string;
  email: string;
  password: string;
  phone?: string;
  utr?: string;
  role?: Role;
  // Fields required for employers
  organizationName?: string;
  industryType?: string;
  totalEmployee?: number;
  description?: string;
  address?: string;
  province?: string;
  city?: string;
  createdOrg?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: RequestBody = await request.json();
    const {
      name,
      email,
      password,
      role,
      phone,
      utr,
      industryType,
      totalEmployee,
      description,
      address,
      city,
      createdOrg
    } = body;


    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (role !== "jobSeeker" && role !== "employer") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (role === "jobSeeker" && !utr) {
      return NextResponse.json({ error: "UTR number is required for job seekers" }, { status: 400 });
    }

    if (role === "employer" && (!industryType)) {
      return NextResponse.json({ error: "Industry type and organization name are required for employers" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyToken = Math.random().toString(36).substring(2);
    const verifyTokenExpiry = new Date(Date.now() + 3600000); 

    let user;

    if (role === "employer") {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verifyToken,
          verifyTokenExpiry,
          role: "employer",
          industryType,
          totalEmployee,
          description,
          address,
          city,
          createdOrg,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verifyToken,
          role: "jobSeeker",
          phone,
          utr, 
        },
      });
      console.log(user);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
