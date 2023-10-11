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
      throw new Error("Post Comment ID is missing.");
    }

    const deletedPostComment = await prisma.postComment.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ status: "success", data: deletedPostComment });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
