import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
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

    const isAdmin = user.isAdmin;

    let requests;

    if (isAdmin) {
      requests = await prisma.request.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      requests = await prisma.request.findMany({
        where: {
          authorId: user.chatId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    const safeRequests = requests.map((r) => ({
      ...r,
      number: r.number.toString(),
      authorId: r.authorId.toString(),
    }));

    return NextResponse.json(safeRequests, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Ошибка при получении заявок" }, { status: 500 });
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