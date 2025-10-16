export async function getWellRate() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_WELL_MOSCA!, {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error("Ошибка получения курса");
    }
    const data = await response.json();
    const apiBuy = parseFloat(data?.sell) + 0.4;
    const apiSell = parseFloat(data?.buy);
    return {
        buy: apiBuy.toFixed(2),
        sell: apiSell.toFixed(2),
       // заметка, покупка и продажа поменяны местами, за место покупки у нас идёт продажа +0.4 копейки
      //  заместо продажи у нас идёт парсинг курса покупки
    };
  } catch (err) {
     
   console.error(err);
   return {buy:null, sell:null,};
  }
}
