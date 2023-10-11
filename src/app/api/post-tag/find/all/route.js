import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(request, response) {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.postTag.findMany();

    return NextResponse.json({
      status: "success",
      data: result
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error.message
    }, {
      status: 500
    });
  } finally {
    await prisma.$disconnect();
  }
}