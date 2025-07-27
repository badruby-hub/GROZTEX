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
         const authorId = tg.initDataUnsafe?.user?.id;
         const res = await fetch(`/api/requests?authorId=${authorId}`);
         const data = await res.json();
         console.log("дата:",data);
         console.log("typeof data:", typeof data);
         console.log("Array.isArray(data):", Array.isArray(data));

               setRequests(data);
       }
        fetchPost();


      return () => {
         tg.BackButton.hide();
         tg.BackButton.offClick(btnBackClick);
      };

      
   }, []);
   console.log("requests:", requests);
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