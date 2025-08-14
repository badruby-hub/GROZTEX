import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { chatId, text } = await req.json();

    if (!chatId || !text) {
      return NextResponse.json({ error: "chatId и text обязательны" }, { status: 400 });
    }

    const token = process.env.BOT_TOKEN;
    const API = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: "Ошибка Telegram API", details: errorData }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
