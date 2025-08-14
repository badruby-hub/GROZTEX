import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { chat_id, text } = await req.json();

    const token = process.env.BOT_TOKEN;
    if (!token) return NextResponse.json({ error: "BOT_TOKEN не задан" }, { status: 500 });

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Ошибка отправки сообщения" }, { status: 500 });
  }
}
