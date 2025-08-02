"use client";
import { useEffect } from "react";
import classes from "./statistics.module.css";
import BtnBackHome from "@/components/Button/BtnBackHome";

export default function Statistics() {
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
    },[]);

    return <div className={classes.container__statistics}>
    Статистика
    <BtnBackHome/>
    </div>
}