import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      throw new Error("Tag ID is missing.");
    }

    const tag = await prisma.tag.findUnique({
      where: { id: Number(id) },
    });

    if (!tag) {
      throw new Error("Tag not found.");
    }

    return NextResponse.json({ status: "success", data: tag });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); 
  }
}
