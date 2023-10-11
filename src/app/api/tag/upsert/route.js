import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(request, response) {
  try {
    const requestBody = await request.json();
    const id = requestBody.id || null;

    const result = id
      ? await prisma.tag.update({
          where: { id },
          data: requestBody,
        })
      : await prisma.tag.create({
          data: requestBody,
        });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database to release resources
  }
}
