import { useEffect } from "react";
import { BtnBackHome } from "../button/buttonBackHome";
const tg = window.Telegram.WebApp;

export default function ExchangePage() {
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
    return<div className="block__content__exchange">
        <BtnBackHome/>
    </div>
}