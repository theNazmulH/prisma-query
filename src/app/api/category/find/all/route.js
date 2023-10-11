import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(request, response) {
  try {
    const categories = await prisma.category.findMany();

    if (categories.length === 0) {
      return NextResponse.json({ status: "success", data: [] });
    }

    return NextResponse.json({ status: "success", data: categories });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database to release resources
  }
}
