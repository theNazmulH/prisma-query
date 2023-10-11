import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(request, response) {
  try {
    const tags = await prisma.tag.findMany();

    if (tags.length === 0) {
      return NextResponse.json({ status: "success", data: [] });
    }

    return NextResponse.json({ status: "success", data: tags });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); 
  }
}
