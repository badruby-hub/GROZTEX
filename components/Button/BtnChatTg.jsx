"use client";
import Link from "next/link";
import classes from "./button.module.css";




export default function BtnChatTg(){

      const onClose =()=>{
        const tg = window.Telegram.WebApp
         tg.close();
       }

   return   <div onClick={onClose} className={classes.btn__chat__tg}>
          <Link className={classes.link} href="https://t.me/gess13">
            чат
          </Link>
      </div>
}