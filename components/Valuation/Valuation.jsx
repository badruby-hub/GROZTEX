"use client"
import { useEffect } from "react";
import classes from "./valuation.module.css"
import BtnBackHome from "@/components/Button/BtnBackHome"

export default function Valuation() {

  useEffect(() => {
        const tg = window.Telegram.WebApp;
          
           tg.BackButton.show();
  
      const btnBackClick = () => {
        tg.history.back();
      };
  
      tg.BackButton.onClick(btnBackClick);
  
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
            <p className={classes.well}>78.55 ₽</p>
          </div>
          <div className={classes.container__sell}>
            <p className={classes.sell}>Продажа</p>
            <p className={classes.well}>78 ₽</p>
          </div>
          <p>Мы не берём никаких дополнительных комиссий с Вас</p>
          <BtnBackHome/>
      </div>
    </div>
}