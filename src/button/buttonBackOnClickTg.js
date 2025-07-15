import { useEffect } from "react";

const tg = window.Telegram.WebApp;

export  function BackButtonOnclick() {
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
}