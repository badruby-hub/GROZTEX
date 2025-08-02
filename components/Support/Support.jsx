'use client';
import Link from "next/link";
import BtnBackHome from "@/components/Button/BtnBackHome";
import BtnChatTg from "@/components/Button/BtnChatTg";
import classes from './support.module.css';
import { useEffect } from "react";

export default function Support() {
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

   return  <div className={classes.block__content__support}>
        <div className={classes.container__text__support}>
  <h1 className={classes.zagolovok} >Поддержка</h1>
  <div className={classes.text__support}>
     <p> Наша операторы на связи 24/7. Готовы ответить на любые вопросы.</p>
     <p> Для покупки USDT, вам нужно создать заявку через бота</p>
     <p> Для связи с нами напишите в Telegram канал —<Link  className={classes.link__tg} href="https://t.me/GROZTEX">GROZTEX__SUPPORT</Link></p>
  </div>
      <BtnChatTg/>
     <BtnBackHome/> 
        </div>
   
    </div>
}