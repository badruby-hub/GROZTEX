"use client";
import Link from "next/link";
import classes from "./header.module.css"
import { useEffect, useState } from "react";



export default function AdminHeader(){
    const [chatId, setChatId] = useState(null);
   useEffect(()=>{
      const tg = window.Telegram.WebApp;
       tg.expand();
       tg.ready();
const chatId =  tg.initDataUnsafe?.user?.id 

      setChatId(chatId);
   },[]);

   const onClose =()=>{
    const tg = window.Telegram.WebApp;
          tg.close()
    }
 console.log(`chatID:${chatId}`);
     
     return<header className={classes.block__content__home}>
        <nav className={classes.App}>
          <div className={classes.logo}><div className={classes.logo__name}>GROZ
             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="85" height="80" viewBox="0 0 48 48">
             <polygon fill="#4db6ac" points="24,44 2,22.5 10,5 38,5 46,22.5"></polygon>
             <path fill="#fff" d="M38,22c0-1.436-4.711-2.635-11-2.929V16h8v-6H13v6h8v3.071C14.711,19.365,10,20.564,10,22
             s4.711,2.635,11,2.929V36h6V24.929C33.289,24.635,38,23.436,38,22z M24,24c-6.627,0-12-1.007-12-2.25c0-1.048,3.827-1.926,9-2.176
             v3.346c0.96,0.06,1.96,0.08,3,0.08s2.04-0.02,3-0.08v-3.346c5.173,0.25,9,1.128,9,2.176C36,22.993,30.627,24,24,24z"></path>
             </svg>EX</div>
             <div className={classes.logo__title}>best exchange</div></div>
            <ul>
               <li className={classes.exchange}>
                  <Link className={classes.link} href="/admins">Администраторы</Link>
               </li>
               <li className={classes.about}>
                  <Link className={classes.link} href="/blocks">Заблокированные</Link>
               </li>
               <li className={classes.requests}>
                  <Link className={classes.link} href="/requests">Все заявки</Link>
               </li>
               <li className={classes.support}>
                  <Link className={classes.link} href="/static">Статистика</Link>
               </li>
               <li className={classes.valuation}>
                  <Link className={classes.link} href="/valuation">Курс</Link>
               </li>
               <li onClick={onClose} className={classes.close}><div className={classes.btn__close}>Закрыть приложение</div></li>
            </ul>
        </nav>
     </header>
}