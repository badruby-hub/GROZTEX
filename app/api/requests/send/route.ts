const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = (process.env.CHAT_ID || "").split(",");
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

type RequestBody = {
  message: string;
  notifyUserId?: string;
};

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { message, notifyUserId } = body;

    if (!message) {
      return new Response(JSON.stringify({ message: "Message is required" }), { status: 400 });
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

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Telegram API error:", error);
    return new Response(JSON.stringify({ message: "Ошибка отправки сообщения" }), { status: 500 });
  }
}
