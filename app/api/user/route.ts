import prisma from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const chatId = req.headers.get("x-user-chatid");

    if (!chatId) {
      return NextResponse.json({ error: "Нет chatId" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { chatId: BigInt(chatId) },
    });

    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const users = await prisma.user.findMany();

    const safeUsers = users.map((user) => ({
      ...user,
      chatId: user.chatId.toString(),
    }));

    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

