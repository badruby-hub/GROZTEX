
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { chatId } = await req.json();
    const user = await prisma.user.findUnique({ where: { chatId: BigInt(chatId) } });

    const response = NextResponse.json({ isAdmin: user?.isAdmin || false });

    response.cookies.set("chatId", chatId.toString(), { path: "/" });
    response.cookies.set("isAdmin", String(user?.isAdmin || false), { path: "/" });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Ошибка инициализации" }, { status: 500 });
    console.log("ошибка init", error)
  } finally {
    await prisma.$disconnect();
  }
}
