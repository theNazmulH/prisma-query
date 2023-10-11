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
      throw new Error("Post Category ID is missing.");
    }

    const postCategory = await prisma.postCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!postCategory) {
      throw new Error("Post Category not found.");
    }

    return NextResponse.json({ status: "success", data: postCategory });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
