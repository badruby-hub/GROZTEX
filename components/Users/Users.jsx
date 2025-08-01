import { useEffect, useState } from "react"
import classes from "./users.module.css";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


export default function UserControl() {
 const [result, setResult] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
      const tg = window.Telegram.WebApp;
      tg.BackButton.show();

      const btnBackClick =()=>{
        window.history.back();
      } 
       tg.BackButton.onClick(btnBackClick);

                  return () => {
         tg.BackButton.hide();
         tg.BackButton.offClick(btnBackClick);
       };

       
           async function users() {
        try {
            
            setIsLoading(true);
            const response = await fetch(`/api/user`);
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Ошибка инициализации:", error);
        } finally{
            setIsLoading(false);
            
        }
    }
    users()
    },[]);
       const status = {
      true: "Администратор",
      false: "Клиент"
   };
     const flagSwitch = async (user)=>{
        try {
            NProgress.start();
            await fetch("/api/user/admin",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({ chatId: user.chatId }),
            });
            const response = await fetch(`/api/user`);
            const data = await response.json();
            setResult(data);
            toast.success(`${user.isAdmin?
                 "Права администратора удалены"
                  :
                 "Права администратора выданы"}`);
                 NProgress.done();
        } catch (error) {
                toast.error("Ошибка обновления прав");
              console.error(error);
        }
     };


    return  <div className={classes.container__users}>
         <h1 className={classes.zagolovok}>Карточки пользователей</h1>
         {isLoading? <Loader/> : result.map((user)=>{
         return <div className={classes.card} key={user.id}>
      <div className={classes.cardHeader}>
        <span className={classes.role}>
          {status[user.isAdmin]}
        </span>
        <span className={classes.userName}>
          @{user.userName || "Пусто"}
        </span>
      </div>
      <div className={classes.block__main}>
      <div className={classes.cardBody}>
        <div className={classes.id}><strong>ID:</strong> {user.id}</div>
        <div className={classes.firstName}><strong>Имя:</strong> {user.firstName || "Пусто"}</div>
        <div className={classes.lastName}><strong>Фамилия:</strong> {user.lastName || "Пусто"}</div>
        <div className={classes.chatId}><strong>Chat ID:</strong> {user.chatId}</div>
        </div>
            <button onClick={()=>flagSwitch(user)} className={classes.btn__give}>{user.isAdmin ? "Удалить права": "Дать права"}</button>
      </div>
    </div>
 })
}</div>
}