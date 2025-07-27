'use client';
import classes from "./requests.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";
import { useEffect, useState } from "react";

export default function Requests() {
   const [requests, setRequests] = useState([]);
   const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);

   useEffect(() => {
      const tg = window.Telegram.WebApp;
      tg.BackButton.show();
      


      const btnBackClick = () => {
         window.history.back();
      };

      tg.BackButton.onClick(btnBackClick);

   const currentUserId = tg.initDataUnsafe?.user?.id;
         setUserId(currentUserId);

async function checkAdmin() {
    try {
      const res = await fetch(`/api/user/admin?chatId=${userId}`);
        const data = await res.json();
        setIsAdmin(data.isAdmin === true);
    } catch (error) {
      console.error("Ошибка проверки админа:", error);
        setIsAdmin(false);
    }
  }
      
    async function fetchPost() {
     const url = isAdmin
      ? `/api/requests?admin=true`
      : `/api/requests?authorId=${userId}`;

         try {
               const res = await fetch(url);
        const data = await res.json();
        setRequests(data);
         } catch (error) {
            console.error("Ошибка загрузки заявок:", error);
         }
       
       }

   

 if (currentUserId) {
    checkAdmin(currentUserId).then((isAdminResult) => {
      fetchPost(currentUserId, isAdminResult);
    });
  }
        


      return () => {
         tg.BackButton.hide();
         tg.BackButton.offClick(btnBackClick);
      };

      
   }, [isAdmin]);

   const statusMap = {
      PENDING: "Обмен в работе",
      ACCEPTED: "Обмен завершён",
      REJECTED: "Обмен отменён"
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
              {isAdmin && req.status === "PENDING" && (
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