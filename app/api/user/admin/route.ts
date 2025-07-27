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
