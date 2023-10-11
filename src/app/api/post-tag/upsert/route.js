import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const prisma = new PrismaClient();

  try {
    const requestBody = await request.json();
    const id = requestBody.id || 0;
    const result = await prisma.postTag.upsert({
      where: { id: id },
      update: requestBody,
      create: requestBody,
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
