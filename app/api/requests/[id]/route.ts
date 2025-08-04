import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID не передан" }, { status: 400 });
    }

    const body = await req.json();
    const status = body.status;

    if (!["PENDING", "ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Некорректный статус" }, { status: 400 });
    }

    const requestId = BigInt(id);

    const updatedRequest = await prisma.request.update({
      where: { number: requestId },
      data: { status },
    });

    return NextResponse.json(
      {
        ...updatedRequest,
        number: updatedRequest.number.toString(),
        authorId: updatedRequest.authorId.toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка при обновлении заявки" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
