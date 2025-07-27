import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
   const { searchParams } = new URL(request.url);
   const chatId = searchParams.get("chatId"); // Получите chatId из параметров запроса

   if (!chatId) {
      return new Response("chatId is required", { status: 400 });
   }

   const requests = await prisma.request.findMany({
      where: {
         authorId: BigInt(chatId), // Убедитесь, что chatId преобразован в bigint
      },
   });

   return new Response(JSON.stringify(requests), {
      status: 200,
      headers: {
         "Content-Type": "application/json",
      },
   });
}
