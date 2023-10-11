import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  const prisma = new PrismaClient();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const result = await prisma.postTag.findUnique({
      where: { id: id },
    });

    if (result) {
      return NextResponse.json({ status: "success", data: result });
    } else {
      return NextResponse.json({ status: "failed", data: "Tag not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
