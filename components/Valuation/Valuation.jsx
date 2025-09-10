"use client"
import { useEffect, useState } from "react";
import classes from "./valuation.module.css"
import BtnBackHome from "@/components/Button/BtnBackHome"
import toast from "react-hot-toast";
import Link from "next/link";



export default function Valuation() {

  const [buy,setBuy] = useState(null);
  const [sell,setSell] = useState(null);

  useEffect(() => {
        const tg = window.Telegram.WebApp;
           tg.BackButton.show();
  
      const btnBackClick = () => {
        window.history.back();
      };
  
      tg.BackButton.onClick(btnBackClick);


    const fetchWell = async ()=>{
        try {
          const response = await fetch("/api/well-rate");
          const data = await response.json();
          const apiBuy = parseFloat(data.buy);
          const apiSell = parseFloat(data.sell);
          setBuy((apiBuy + 0.4).toFixed(2));
          setSell((apiSell + 0.4).toFixed(2));
          // заметка, покупка и продажа поменяны местами, за место покупки у нас идёт продажа +0.4 копейки
          //  заместо продажи у нас идёт парсинг курса покупки
        } catch (error) {
          toast.error("не удалось получить курс, обратитесь в поддержку ", error)
        }
      }
      fetchWell();

      return () => {
      tg.BackButton.hide();
      tg.BackButton.offClick(btnBackClick);
      };

    
       }, []);
      

    return <div className={classes.block__content__valuation}>
      <div className={classes.container__valuation}>
        <h1 className={classes.zagolovok}>КУРС USDT</h1>
          <div className={classes.container__buy}>
            <p className={classes.buy}>Покупка</p>
            <p className={classes.well}>{sell} RUB</p>
          </div>
          <div className={classes.container__sell}>
            <p className={classes.sell}>Продажа</p>
            <p className={classes.well}>{buy} RUB</p>
          </div>
          <p>Можем зафиксировать для Вас курс</p>
          <p>Мы не берём никаких дополнительных комиссий</p>
          <p>Обращайтесь — <Link  className={classes.link__tg} href="https://t.me/GROZTEX">GROZTEX_SUPPORT</Link></p>
          <BtnBackHome/>
      </div>
    </div>
}