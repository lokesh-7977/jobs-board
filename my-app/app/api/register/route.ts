/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password: plainPassword, name, role, ...employerFields } = await req.json();

  if (!email || !plainPassword || !name || !role) {
    return NextResponse.json({
      message: "Email, password, name, and role are required",
    });
  }

  if (role !== "jobseeker" && role !== "employer") {
    return NextResponse.json({ message: "Invalid role" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    let newUser;

    if (role === "jobseeker") {
      newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });
    } else if (role === "employer") {
      newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
          image:
            employerFields.image ||
            "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
          province: employerFields.province,
          city: employerFields.city,
          district: employerFields.district,
          postalCode: employerFields.postalCode,
          createdOrg: employerFields.createdOrg,
          address: employerFields.address,
          industryType: employerFields.industryType,
          totalEmployee: employerFields.totalEmployee,
          description: employerFields.description,
        },
      });
    }

    const token = jwt.sign({ email, role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    if (newUser) {
      const { password, ...userWithoutPassword } = newUser;
      return NextResponse.json({
        message: "Registration successful",
        user: userWithoutPassword,
        token,
      });
    } else {
      return NextResponse.json({ message: "User creation failed" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
}
