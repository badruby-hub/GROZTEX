import prisma from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const users = await prisma.user.findMany();
    
    const safeUsers = users.map((user) => ({
      ...user,
      chatId: user.chatId.toString(), 
    }));


    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка проверки админа" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
