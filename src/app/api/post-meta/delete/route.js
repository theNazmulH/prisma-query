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

export async function DELETE(request, response) {
  try {
    const {
      searchParams
    } = new URL(request.url);
    const id = searchParams.get("id");

    const result = await prisma.postMeta.delete({
      where: {
        id: id
      },
    });

    return NextResponse.json({
      status: "success",
      data: result
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