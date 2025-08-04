import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
 const chatId = req.headers.get("x-user-chatid");

    if (!chatId) {
      return NextResponse.json({ error: "chatId обязателен" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { chatId: BigInt(chatId) },
    });

    return NextResponse.json({ isAdmin: user?.isAdmin || false });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка проверки админа" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function PATCH(req: NextRequest) {
  try {
    const adminChatId = req.headers.get("x-user-chatid");

    if (!adminChatId) {
      return NextResponse.json({ error: "Нет chatId в заголовке" }, { status: 401 });
    }

    const adminUser = await prisma.user.findUnique({
      where: { chatId: BigInt(adminChatId) },
    });

    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: "Недостаточно прав" }, { status: 403 });
    }

    const body = await req.json();
    const targetChatId = BigInt(body.chatId);

    const targetUser = await prisma.user.findUnique({
      where: { chatId: targetChatId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { chatId: targetChatId },
      data: {
        isAdmin: !targetUser.isAdmin,
      },
    });

    return NextResponse.json({ isAdmin: updatedUser.isAdmin });
  } catch (error) {
    console.error("Ошибка обновления прав:", error);
    return NextResponse.json({ error: "Ошибка обновления прав" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}