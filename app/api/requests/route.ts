import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json([], { status: 200 });
  }

  const user = await prisma.user.findUnique({
    where: {
      chatId: Number(chatId),
    },
  });

  if (!user) {
    return NextResponse.json([], { status: 200 });
  }

  const requests = await prisma.request.findMany({
    where: {
      authorId: BigInt(chatId),
    },
  });

  return NextResponse.json(requests);
}
