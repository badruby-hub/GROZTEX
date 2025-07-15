import { useEffect } from "react";
import { BtnBackHome } from "../button/buttonBackHome";
const tg = window.Telegram.WebApp;

export default function RequestsPage() {
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
    <div className="block__content__request">
      <h1>Все заявки</h1>
      <BtnBackHome/>
    </div>
  );
}
