"use client";
import Link from "next/link";
import classes from "./button.module.css";
import { webAppContext } from "@/app/context/context";
import { useContext } from "react";



export default function BtnChatTg(){
  
 const tg = useContext(webAppContext);
      const onClose =()=>{
         tg.close();
       }

   return   <div onClick={onClose} className={classes.btn__chat__tg}>
          <Link className={classes.link} href="https://t.me/gess13">
            чат
          </Link>
      </div>
}