'use client';
import classes from "./requests.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";
import {  useEffect, useState } from "react";




export default  function Requests() {
    const [requests, setRequests] = useState([]);
    const [chatId, setChatId] = useState(null);

     useEffect(() => {
      const tg = window.Telegram.WebApp;
        setChatId(tg.initDataUnsafe?.user?.id || null);
        
         tgWindow.BackButton.show();

    const btnBackClick = () => {
       const tgWindow = window.Telegram.WebApp;
      tgWindow.history.back();
    };

    tgWindow.BackButton.onClick(btnBackClick);

    return () => {
       const tgWindow = window.Telegram.WebApp;
    tgWindow.BackButton.hide();
    tgWindow.BackButton.offClick(btnBackClick);
    };
     }, []);


     useEffect(() => {
    if (!chatId) return;

    const fetchRequests = async () => {
      const res = await fetch(`/api/requests?chatId=${chatId}`);
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, [chatId]);

   const statusMap = {
  PENDING: "В обработке",
  ACCEPTED: "Принято",
  REJECTED: "Отклонено"
} ;
   const statusEmoji = {
  PENDING: "📨",
  ACCEPTED: "✅",
  REJECTED: "❌"
} ;

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