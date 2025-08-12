"use client";
import BtnBackHome from "@/components/Button/BtnBackHome";
import classes from "./Blocked.module.css";
import { useEffect } from "react";

export default function BlockedUsers() {
    useEffect(() => {
        const tg = window.Telegram.WebApp;
           tg.BackButton.show();
  
      const btnBackClick = () => {
        window.history.back();
      };
  
      tg.BackButton.onClick(btnBackClick);

      return () => {
      tg.BackButton.hide();
      tg.BackButton.offClick(btnBackClick);
      };

    
       }, []);
  return <>
    <h1 className={classes.zagolovok}>Заблокированные пользователи</h1>
     <BtnBackHome/>
     </>    
}