import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const chatIdHeader = req.headers.get("x-user-chatid");
    if (!chatIdHeader) {
      return NextResponse.json({ error: "Не указан chatId" }, { status: 401 });
    }

    const chatId = BigInt(chatIdHeader);
    const user = await prisma.user.findUnique({ where: { chatId } });
    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }

    const isAdmin = user.isAdmin;

    let requests;

    if (searchParams.get("admin") === "true" && isAdmin) {
      requests = await prisma.request.findMany({ orderBy: { createdAt: "desc" } });
    } else if (searchParams.get("authorId")) {
      const authorId = BigInt(searchParams.get("authorId")!);
      if (authorId !== chatId) {
        return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
      }

      requests = await prisma.request.findMany({
        where: { authorId },
        orderBy: { createdAt: "desc" },
      });
    } else {
      return NextResponse.json({ error: "Неверные параметры запроса" }, { status: 400 });
    }

    return NextResponse.json(requests);
  } catch (err) {
    console.error("Ошибка при получении заявок:", err);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}




function generateRandomNumber() {
  const min = 500;
  const max = 55000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST(req: NextRequest) {
  try {
    const chatId = req.headers.get("x-user-chatid");
    if (!chatId) {
      return NextResponse.json({ error: "Нет chatId" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { chatId: BigInt(chatId) },
    });

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }


    const body = await req.json();
    const { status } = body;

  
    const number = generateRandomNumber();

    const newRequest = await prisma.request.create({
      data: {
        number: BigInt(number),
        authorId: user.chatId,
        status: status || "PENDING",
      },
    });

    return NextResponse.json(
      {
        ...newRequest,
        number: newRequest.number.toString(),
        authorId: newRequest.authorId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка при создании заявки" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}