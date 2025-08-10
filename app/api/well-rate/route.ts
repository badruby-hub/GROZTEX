import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_WELL_MOSCA!);
    if (!response.ok) {
      return NextResponse.json({ error: 'Ошибка от API' }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка получения курса' }, { status: 500 });
  }
}
