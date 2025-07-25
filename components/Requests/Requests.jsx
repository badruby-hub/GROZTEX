'use client';
import classes from "./requests.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";
import prisma from "@/lib/db";
import {  useEffect, useState } from "react";




export default  function Requests() {
    const [chatId, setChatId] = useState([]);
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


     useEffect(() => {
    const fetchRequests = async () => {
    const tg = window.Telegram.WebApp;
    const chatId =  tg.initDataUnsafe?.user?.id 
     console.log("chadId", chatId);
      setChatId(chatId);
    };

    fetchRequests();
  }, []);

useEffect(() => {
        const fetchRequests = async () => {
            if (chatId) {
                const requestsData = await prisma.request.findMany({
                    where: {
                        authorId: chatId
                    }
                });
                setRequests(requestsData);
            }
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