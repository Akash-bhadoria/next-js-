import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  console.log(body);

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const createUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json("User Created Successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
