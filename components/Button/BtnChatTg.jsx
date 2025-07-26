"use client";
import Link from "next/link";
import classes from "./button.module.css";
import { useTelegram } from "@/context/TelegramProvider";




export default function BtnChatTg(){
    const tg = useTelegram();


      const onClose =()=>{
         tg.close();
       }

   return   <div onClick={onClose} className={classes.btn__chat__tg}>
          <Link className={classes.link} href="https://t.me/gess13">
            чат
          </Link>
      </div>
}