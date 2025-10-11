import { NextRequest } from "next/server";
import prisma from "@/lib/db";

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

type RequestBody = {
  userMessage?: string;
  senderChatId?: number; //кто запустил рассылку
};

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { userMessage, senderChatId } = body;

    if (!userMessage) {
      return new Response(JSON.stringify({ message: "Нет текста сообщения" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const users = await prisma.user.findMany({
      where: {isDeletedBot: false},
      select: { chatId: true },
    });

    let successCount = 0;
    let removedCount = 0;

    //отправка пользователям рассылки !
     for (const user of users) {
         try {
      const res = await fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: Number(user.chatId),
          text: userMessage,
          parse_mode: "MarkdownV2",
        }),
      });

      const data = await res.json();

      if (!data.ok && data.error_code === 403) {
        await prisma.user.update({
          where: { chatId: BigInt(user.chatId) },
          data: { isDeletedBot: true },
        });
        removedCount++;
        console.log(`Удален пользователь ${user.chatId}- бот заблокирован.`);
      } else if (data.ok) {
        successCount++;
      }
      await new Promise((res) => setTimeout(res, 80));
    } catch (err) {
      console.error(`Ошибка при отправке пользователю ${user.chatId}:`, err);
    }
     }
   

    await prisma.newsletterLog.create({
      data: {
        message: userMessage,
        sentCount: successCount,
        removedCount: removedCount,
        createdById: senderChatId ? BigInt(senderChatId) : null,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Сообщение успешно отправлено",
        sent: successCount,
        removed: removedCount,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Telegram Api error :", error);
    return new Response(
      JSON.stringify({ message: "Ошибка отправки сообщения" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
