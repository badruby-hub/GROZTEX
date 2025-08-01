
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(req: NextRequest) {
  try {
    const { chatId } = await req.json();

    if (!chatId) {
      return NextResponse.json({ error: "chatId обязателен" }, { status: 400 });
    }

    let chatIdBigInt;
    try {
      chatIdBigInt = BigInt(chatId);
    } catch {
      return NextResponse.json({ error: "chatId должен быть числом" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { chatId: chatIdBigInt } });

    const response = NextResponse.json({ isAdmin: user?.isAdmin || false });

    response.cookies.set("chatId", chatId.toString(), { path: "/", httpOnly: false });
    response.cookies.set("isAdmin", String(user?.isAdmin || false), { path: "/", httpOnly: false });

    return response;
  } catch (e) {
    console.error("Ошибка в /api/auth/init:", e);
    return NextResponse.json({ error: "Ошибка инициализации" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
