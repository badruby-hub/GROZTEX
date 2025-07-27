import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export  async function GET(req: NextRequest) {
      if (req.method === "GET") {
         try {
        const { searchParams } = new URL(req.url);
        const authorIdParam = searchParams.get("authorId");
      if (!authorIdParam) {
        return NextResponse.json({ error: "authorId обязателен" }, { status: 400 });
      }

        const authorId = BigInt(authorIdParam);

 

            const requests = await prisma.request.findMany({
           where:{
               authorId: authorId
           }
            });
             const safeRequests = requests.map((r) => ({...r,
             number: r.number.toString(),
             authorId: r.authorId.toString(),
    }));
            return NextResponse.json(safeRequests, { status: 200 });
         } catch (error) {
            console.log(error);
            return NextResponse.json({error: "Ошибка при получении постов"},{status: 500});
         }finally{
            await prisma.$disconnect();
         }
      }


      if (req.method === "POST") {
         try {
            const body = await req.json();
            const {number,authorId, status} = body;

            if (!number || !authorId) {
            return NextResponse.json({ error: "number и authorId обязательны" }, { status: 400 });
           }
            const numberBigInt = BigInt(number);
            const authorIdBigInt = BigInt(authorId);

             const newRequest = await prisma.request.create({
      data: {
        number: numberBigInt,
        authorId: authorIdBigInt,
        status: status || "PENDING",
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
