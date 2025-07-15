import { useEffect } from "react";
import { BtnBackHome } from "../button/buttonBackHome";
const tg = window.Telegram.WebApp;

export default function ValuationPage() {
      useEffect(()=>{
         tg.BackButton.show();
         const btnBackClick=()=>{
                window.history.back()
         };
   
         tg.BackButton.onClick(btnBackClick);
   
           return () => {
         tg.BackButton.hide();
         tg.BackButton.offClick(btnBackClick);
       };
       },[])
  return (
    <div className="block__content__valuation">
      <div className="container__valuation">
        <h1>КУРС USDT</h1>
          <div className="container__buy">
            <p className="buy">Покупка</p>
            <p className="well">78.55 ₽</p>
          </div>
          <div className="container__sell">
            <p className="sell">Продажа</p>
            <p className="well">78 ₽</p>
          </div>
          <p>Мы не берём никаких дополнительных комиссий с Вас</p>
          <BtnBackHome />
      </div>
    </div>
  );
}
