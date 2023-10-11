import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function DELETE(request, response) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      throw new Error("User ID is missing.");
    }

    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return NextResponse.json({ status: "success", data: user });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect();
  }
}