import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(request, response) {
  try {
    const requestBody = await request.json();
    const id = requestBody.id || 0;
    const result = await prisma.user.upsert({
      where: { id },
      update: requestBody,
      create: requestBody,
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.toString() });
  } finally {
    await prisma.$disconnect();
  }
}