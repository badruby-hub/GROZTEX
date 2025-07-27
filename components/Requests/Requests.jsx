'use client';
import classes from "./requests.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";
import { useEffect, useState } from "react";

export default function Requests() {
   const [requests, setRequests] = useState([]);

   useEffect(() => {
      const tg = window.Telegram.WebApp;
      tg.BackButton.show();
      
    

      const btnBackClick = () => {
         window.history.back();
      };

      tg.BackButton.onClick(btnBackClick);

      return () => {
         tg.BackButton.hide();
         tg.BackButton.offClick(btnBackClick);
      };
   }, []);

   const statusMap = {
      PENDING: "В обработке",
      ACCEPTED: "Принято",
      REJECTED: "Отклонено"
   };

   const statusEmoji = {
      PENDING: "📨",
      ACCEPTED: "✅",
      REJECTED: "❌"
   };

   return (
      <div className={classes.container__requests}>
         <div className={classes.block__req}>
            {requests.map(request => (
               <div key={request.id}>
                  <p>{statusEmoji[request.status]} {statusMap[request.status]}</p>
               </div>
            ))}
         </div>
         <BtnBackHome />
      </div>
   );
}
