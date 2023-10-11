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
      throw new Error("Post ID is missing.");
    }

    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });

    if (!post) {
      throw new Error("Post not found.");
    }

    return NextResponse.json({ status: "success", data: post });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database to release resources
  }
}
