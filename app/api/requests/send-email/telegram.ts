// pages/api/requests/telegram.ts
import type { NextApiRequest, NextApiResponse } from "next";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = (process.env.CHAT_ID || "").split(",");
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { message, notifyUserId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Отправка админам
    for (const chatId of CHAT_IDS) {
      await fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
    }

    // Если нужно уведомить конкретного пользователя
    if (notifyUserId) {
      await fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: notifyUserId,
          text: `Ваша заявка принята!\n\n${message}`,
        }),
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Telegram API error:", error);
    return res.status(500).json({ message: "Ошибка отправки сообщения" });
  }
}
