import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json([], { status: 200 });
  }

  const user = await prisma.user.findMany();

  if (!user) {
    return NextResponse.json([], { status: 200 });
  }

  const requests = await prisma.request.findMany({
    where: {
      authorId: BigInt(chatId),
    },
  });
console.log("chatId:", chatId, 'req:', requests);
  return NextResponse.json(requests);
}
