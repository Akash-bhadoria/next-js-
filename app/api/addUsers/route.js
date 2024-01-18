import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const body = await req.json();
  try {
    const createUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        mobile: body.mobile,
      },
    });
    return NextResponse.json("User Created Successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
