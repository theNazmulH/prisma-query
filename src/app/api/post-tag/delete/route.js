import {
  PrismaClient
} from "@prisma/client";
import {
  NextResponse
} from "next/server";

export async function DELETE(request, response) {
  const prisma = new PrismaClient();

  try {
    const {
      searchParams
    } = new URL(request.url);
    const id = searchParams.get("id");
    const result = await prisma.postTag.delete({
      where: {
        id
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
    }, {
      status: 500
    });
  } finally {
    await prisma.$disconnect();
  }
}