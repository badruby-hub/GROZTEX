import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");
    const authorIdParam = searchParams.get("authorId");

    if (admin === "true") {
      const requests = await prisma.request.findMany({
        orderBy: { createdAt: "desc" },
        include: { User: true },
      });

      const safeRequests = requests.map((r) => ({
        ...r,
        number: r.number.toString(),
        authorId: r.authorId.toString(),
        User: r.User
          ? {
              ...r.User,
              chatId: r.User.chatId.toString(),
            }
          : null,
      }));

      return NextResponse.json(safeRequests, { status: 200 });
    }

    if (!authorIdParam) {
      return NextResponse.json(
        { error: "authorId обязателен" },
        { status: 400 }
      );
    }

    const authorId = BigInt(authorIdParam);

    const requests = await prisma.request.findMany({
      where: { authorId },
      orderBy: { createdAt: "desc" },
      include: { User: true },
    });

    const safeRequests = requests.map((r) => ({
      ...r,
      number: r.number.toString(),
      authorId: r.authorId.toString(),
      User: r.User
        ? {
            ...r.User,
            chatId: r.User.chatId.toString(),
          }
        : null,
    }));

    return NextResponse.json(safeRequests, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Ошибка при получении постов" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export async function POST(req: NextRequest) {
   function generateRandomNumber() {
  const min = 500;
  const max = 55000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

      if (req.method === "POST") {
         try {
            const body = await req.json();
            const {authorId, status, sum, firstName, lastName } = body;

            if (!authorId || sum === undefined) {
            return NextResponse.json({ error: " sum и authorId обязательны" }, { status: 400 });
           }

            const number = generateRandomNumber();
            const numberBigInt = BigInt(number);
            const authorIdBigInt = BigInt(authorId);
            const sumFloat = parseFloat(sum.replace(/\s/g, ''));

             const newRequest = await prisma.request.create({
      data: {
        number: numberBigInt,
        authorId: authorIdBigInt,
        status: status || "PENDING",
        sum: sumFloat,
        firstName,
        lastName,
      },
    });

     return NextResponse.json({
      ...newRequest,
      number: newRequest.number.toString(),
      authorId: newRequest.authorId.toString(),
    }, { status: 201 });

         } catch (error) {
             console.error(error);
    return NextResponse.json({ error: "Ошибка при создании заявки" }, { status: 500 });
         }finally{
            await prisma.$disconnect();
         }
      }
}

