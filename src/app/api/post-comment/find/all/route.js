import {
  PrismaClient
} from "@prisma/client";
import {
  NextResponse
} from "next/server";

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(request, response) {
  try {
    const postComments = await prisma.postComment.findMany();

    return NextResponse.json({
      status: "success",
      data: postComments
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}