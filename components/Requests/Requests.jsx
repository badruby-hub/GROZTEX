'use client';
import classes from "./requests.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";




export default function Requests() {
   const [requests, setRequests] = useState([]);
   const [search, setSearch] = useState("");
   const [debouncedSearch, setDebouncedSearch] = useState("");
   const [isAdmin, setIsAdmin] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const token = process.env.NEXT_PUBLIC_BOT_TOKEN;
   const API = `https://api.telegram.org/bot${token}/sendMessage`;

       useEffect(() => {
      const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 600); // 600 мс пауза

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

useEffect(() => {
  const tg = window.Telegram.WebApp;
  tg.BackButton.show();

  const btnBackClick = () => {
    window.history.back();
  };
  tg.BackButton.onClick(btnBackClick);

  const currentUserId = tg.initDataUnsafe?.user?.id;
  if (!currentUserId) {
    toast.error(
  "Войдите через телеграм приложение!",
  {
    duration: 6000,
  }
    );
    return;
  }
  async function init() {
    try {
      setIsLoading(true);
      const resAdmin = await fetch(`/api/user/admin?chatId=${currentUserId}`);
      const dataAdmin = await resAdmin.json();
      const isAdminResult = dataAdmin.isAdmin === true;
      setIsAdmin(isAdminResult);

      const url = isAdminResult
        ? `/api/requests?admin=true`
        : `/api/requests?authorId=${currentUserId}`;

      const resReq = await fetch(url);
      const dataReq = await resReq.json();

      if (!Array.isArray(dataReq)) {
        throw new Error("Ожидался массив заявок, получено: " + JSON.stringify(dataReq));
      }

      setRequests(dataReq);
    } catch (error) {
      console.error("Ошибка инициализации:", error);
    }finally{
      setIsLoading(false);
    }
  }

  init();

  return () => {
    tg.BackButton.hide();
    tg.BackButton.offClick(btnBackClick);
  };
}, []);


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

   function formatSumWithSpaces(sum) {
  return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

  async function updateStatus(number, status) {



  

    const statusMessageMap = {
        ACCEPTED: "✅ Ваша заявка принята!",
        REJECTED: "❌ Ваша заявка отклонена.",
      };


   try {
        const res = await fetch(`/api/requests/${number}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ status }),
       });
       if(res.ok){
           const updated = await res.json();
           setRequests((prev) =>prev.map((r) => (r.number === updated.number ? updated : r)));
           toast.success("статус заявки обновлен")


const notificationText = `
${statusMessageMap[status] || ""}
  Номер заявки: ${updated.number}

С уважением,  
GROZTEX`;
           await fetch(API,{
                method: "POST",
                headers:{
                  'Content-Type':"application/json"
                }, 
                body: JSON.stringify({
                  chat_id: updated.authorId,
                  text: notificationText,
                })
              })
       }else{
        toast.error("статус заявки не обновлен");
       }
   } catch (error) {
         toast.error("произошла ошибка при обновлении статуса", error);
   }
  }

    const filteredRequests = requests.filter((req) => {
    const query = debouncedSearch.toLowerCase();
    return (
      req.firstName?.toLowerCase().includes(query) ||
      req.lastName?.toLowerCase().includes(query) ||
      req.User?.userName?.toLowerCase().includes(query) ||
      req.User?.firstName?.toLowerCase().includes(query) ||
      req.number?.toString().includes(query)
    );
  });

    return <div className={classes.container__requests}>
      
        <div className={classes.block__req}>
          <h1 className={classes.zagolovok}>Заявки</h1>
           <h3 className={classes.zagolovok__search}>поиск пользователей</h3>
         <input 
         className={classes.search__input} 
         type="search"
         maxLength="15" 
         value={search} 
         onChange={(e) => setSearch(e.target.value)}
         placeholder="Введите данные заявки"/>
         <hr />
          <h4 className={classes.zagolovok__count__users}>Всего заявок:<span className={classes.count__users}>{requests.length}</span></h4>
          {isLoading? <Loader/> : filteredRequests.map((req)=>{
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
            <p className={classes.sum}>Сумма: {req.sum ? formatSumWithSpaces(req.sum) : "Пусто"}</p>
            <p className={classes.firstName}>
              Имя: {req.firstName || "Пусто"} 
            </p>
            <p className={classes.lastName}>
               Фамилия: {req.lastName || "Пусто"}
            </p>
            <p className={classes.userName}>
              Ник tg: {req.User?.userName || "Пусто"}
            </p>
            <p className={classes.firstNametg}>
              Имя tg: {req.User?.firstName || "Пусто"}
            </p>
            </div>
            </div>
              {isAdmin && req.status === "PENDING" && (
                 <div className={classes.btn_block_status}>
                   <button className={classes.status__accepted} onClick={() => updateStatus(req.number, "ACCEPTED")}>Принять</button>
                   <button className={classes.status__rejected} onClick={() => updateStatus(req.number, "REJECTED")}>Отклонить</button>
                 </div>
               )}
           </div>
          })}
           {!isLoading && <BtnBackHome />}
        </div>
    </div>
}