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


    async function fetchPost() {
         const res = await fetch("/api/request");
         const data = await res.json();
               setRequests(data);
       }
        fetchPost();


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

    return <div className={classes.container__requests}>
        <div className={classes.block__req}>
          
          {requests.map((req)=>{
             const dateObj = new Date(req.createdAt);
             return <div className={classes.request__info__box} key={req.number}>
               <p className={classes.date}>{dateObj.toLocaleDateString("ru-RU", {
                weekday:"long",
                day:"numeric",
                month:"long"
              })}
              </p>
              <div className={classes.block__status}>
                {statusEmoji[req.status]}
              <div>
              <p className={classes.status}>
                {statusMap[req.status]}
            </p> 
            <p className={classes.number}>Номер заявки: {req.number}</p>
            </div>
            </div>
           </div>
          })}
        </div>
       <BtnBackHome/>
    </div>
}