import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: { number: string } }) {
  try {
    const chatIdHeader = req.headers.get("x-user-chatid");

    if (!chatIdHeader) {
      return NextResponse.json({ error: "Нет chatId" }, { status: 401 });
    }

    const chatId = BigInt(chatIdHeader);

    const user = await prisma.user.findUnique({ where: { chatId } });

    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const number = BigInt(params.number);
    const body = await req.json();
    const { status } = body;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Недопустимый статус" }, { status: 400 });
    }

    const updated = await prisma.request.update({
      where: { number },
      data: { status },
    });

    const safeUpdated = {
      ...updated,
      number: updated.number.toString(),
      authorId: updated.authorId.toString(),
    };

    return NextResponse.json(safeUpdated);
  } catch (error) {
    console.error("Ошибка обновления статуса заявки:", error);
    return NextResponse.json({ error: "Внутренняя ошибка" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}