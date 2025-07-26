"use client";
import Link from "next/link";
import classes from "./button.module.css";
import { useEffect, useState } from "react";


export default function BtnChatTg(){
  
const [tg, setTg] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const telegram = window.Telegram?.WebApp;
      if (telegram) {
        setTg(telegram);
        };
      }
  }, []);

      const onClose =()=>{
         tg.close();
       }

   return   <div onClick={onClose} className={classes.btn__chat__tg}>
          <Link className={classes.link} href="https://t.me/gess13">
            чат
          </Link>
      </div>
}