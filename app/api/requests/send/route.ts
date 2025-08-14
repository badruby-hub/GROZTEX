import { NextRequest } from "next/server";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = (process.env.CHAT_ID || "").split(",");
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

type RequestBody = {
  adminMessage: string;
  userMessage?: string;
  userChatId?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { adminMessage, userMessage, userChatId } = body;

    if (!adminMessage) {
      return new Response(JSON.stringify({ message: "adminMessage is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Отправка админам
    for (const chatId of CHAT_IDS) {
      await fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: adminMessage }),
      });
    }

    // Отправка пользователю
    if (userMessage && userChatId) {
      await fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: userChatId, text: userMessage }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Telegram API error:", error);
    return new Response(JSON.stringify({ message: "Ошибка отправки сообщения" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
