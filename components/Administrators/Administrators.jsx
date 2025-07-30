import { useEffect, useState } from "react"
import classes from "./administrators.module.css";
import Loader from "../Loader/Loader";

export default function Administrators() {
 const [result, setResult] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
      const tg = window.Telegram.WebApp;
      tg.BackButton.show();

      const btnBackClick =()=>{
        window.history.back();
      } 
       tg.BackButton.onClick(btnBackClick);
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

    return  <div className={classes.container__users}>
         <h1 className={classes.zagolovok}>Пользователи</h1>
         {isLoading? <Loader/> :
          <table className={classes.block__info}>
             <thead>
                <tr>
                 <th className={classes.th}>id</th>
                 <th className={classes.th}>Администратор</th>
                 <th className={classes.th}>ник тг</th>
                 <th className={classes.th}>Имя</th>
                 <th className={classes.th}>Фамилия</th>
                 <th className={classes.th}>чат id</th>
                </tr>
            </thead>
        <tbody>
         {result.map((req)=>{
            return<tr key={req.id}>
                <td className={`${classes.id} ${classes.td}`}>{req.id || "Пусто"}</td>
                <td className={`${classes.isAdmin} ${classes.td}`}>{status[req.isAdmin]}</td>
                <td className={`${classes.userName} ${classes.td}`}>{req.userName || "Пусто"}</td>
                <td className={`${classes.firstName} ${classes.td}`}>{req.firstName || "Пусто"}</td>
                <td className={`${classes.lastName} ${classes.td}`}>{req.lastName || "Пусто"}</td>
                <td className={`${classes.chatId} ${classes.td}`}>{req.chatId || "Пусто"}</td>
                </tr>
        })}
        </tbody>
      
         </table>
}</div>
}