"use client"
import { useEffect, useState } from "react";
import classes from "./valuation.module.css"
import BtnBackHome from "@/components/Button/BtnBackHome"
import toast from "react-hot-toast";
const apiMosca = process.env.NEXT_PUBLIC_API_WELL_MOSCA;
export default function Valuation() {
  const [buy,setBuy] = useState(null);
  const [sell,setSell] = useState(null);

  useEffect(() => {
    console.log("API URL:", apiMosca);

        const tg = window.Telegram.WebApp;
           tg.BackButton.show();
  
      const btnBackClick = () => {
        window.history.back();
      };
  
      tg.BackButton.onClick(btnBackClick);


    const fetchWell = async ()=>{
        try {
          const response = await fetch(apiMosca);
          const data = await response.json();
          const apiBuy = parseFloat(data.buy);
          const apiSell = parseFloat(data.sell);
          setBuy((apiBuy + 0.5).toFixed(2));
          setSell((apiSell - 0.5).toFixed(2));
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
            <p className={classes.well}>{buy}₽</p>
          </div>
          <div className={classes.container__sell}>
            <p className={classes.sell}>Продажа</p>
            <p className={classes.well}>{sell} ₽</p>
          </div>
          <p>Мы не берём никаких дополнительных комиссий с Вас</p>
          <BtnBackHome/>
      </div>
    </div>
}