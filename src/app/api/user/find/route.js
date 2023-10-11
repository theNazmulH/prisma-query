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
      throw new Error("User ID is missing.");
    }

    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!result) {
      throw new Error("User not found.");
    }

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database to release resources
  }
}