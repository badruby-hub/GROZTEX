import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chatIdParam = searchParams.get("chatId");

    if (!chatIdParam) {
      return NextResponse.json({ error: "chatId обязателен" }, { status: 400 });
    }

    const chatId = BigInt(chatIdParam);
    const user = await prisma.user.findUnique({ 
        where: { 
            chatId 
        } 
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
    const body = await req.json();
    const chatId = BigInt(body.chatId);

    const user = await prisma.user.findUnique({
      where: { chatId },
    });

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { chatId },
      data: {
        isAdmin: !user.isAdmin,
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
