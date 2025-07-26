'use client'
import classes from "./requests.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";
import { useTelegram } from "@/context/TelegramProvider";
import { useEffect, useState } from "react";




export default  function Requests() {
    const tg = useTelegram();
    const chatId = tg?.initDataUnsafe?.user?.id ;
    
    const [requests, setRequests] = useState([]);

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
  REJECTED: "От❌клонено"
} ;

    return <div className={classes.container__requests}>
        <div className={classes.block__req}>
          {requests.map((req)=>(
           <div className={classes.request__info__box} key={req.number}>
               <p className={classes.date}>{req.createdAt.toLocaleDateString("ru-RU", {
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
          ))}
        </div>
       <BtnBackHome/>
    </div>
}