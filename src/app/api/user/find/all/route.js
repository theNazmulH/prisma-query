import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(request, response) {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json({ status: "success", data: [] });
    }

    return NextResponse.json({ status: "success", data: users });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database to release resources
  }
}