'use client';
import classes from "./requests.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";
import { useEffect, useState } from "react";

export default function Requests() {
   const [requests, setRequests] = useState([]);
   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
      const tg = window.Telegram.WebApp;
      tg.BackButton.show();
      
    
      const userId = tg.initDataUnsafe?.user?.id;
      setIsAdmin(userId === 7992841421);


      const btnBackClick = () => {
         window.history.back();
      };

      tg.BackButton.onClick(btnBackClick);


    async function fetchPost() {
      let url;
      if(userId === isAdmin ){
          url = `/api/requests?admin=true`;
      }else{
          url = `/api/requests?authorId=${userId}`
      }
         const res = await fetch(url);
         const data = await res.json();
         console.log("дата:",data);

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
  async function updateStatus(number, status) {
   try {
        const res = await fetch(`/api/requests/${number}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ status }),
       });
       const updated = await res.json();
       setRequests((prev) =>
         prev.map((r) => (r.number === updated.number ? updated : r))
       );
   } catch (error) {
         console.error("Ошибка при обновлении статуса", error);
   }
  }
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
              {userId === 7992841421 && req.status === "PENDING" && (
                 <div>
                   <button onClick={() => updateStatus(req.number, "ACCEPTED")}>Принять</button>
                   <button onClick={() => updateStatus(req.number, "REJECTED")}>Отклонить</button>
                 </div>
               )}
           </div>
          })}
        </div>
       <BtnBackHome/>
    </div>
}