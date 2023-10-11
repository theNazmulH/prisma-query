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
      throw new Error("Post Comment ID is missing.");
    }

    const postComment = await prisma.postComment.findUnique({
      where: { id: Number(id) },
    });

    if (!postComment) {
      return NextResponse.json({ status: "failed", data: "Post Comment not found." });
    }

    return NextResponse.json({ status: "success", data: postComment });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect(); 
  }
}
