import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



export  async function GET(req: NextRequest) {
      if (req.method === "GET") {
         try {
            const requests = await prisma.request.findMany();
            return NextResponse.json(requests, { status: 200 });
         } catch (error) {
            console.log(error);
            return NextResponse.json({error: "Ошибка при получении постов"},{status: 500});
         }finally{
            await prisma.$disconnect();
         }
      }else{
         return NextResponse.json({message: "метод не разрешен"},{status:405});
      }
}
