'use client';
import { useEffect } from "react";
import BtnBackHome from "@/components/Button/BtnBackHome"
import classes from "./about.module.css";

 

export default function About() {

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


    return  <div className={classes.block__content__about}>
      <div className={classes.container__text}>
      <h1 className={classes.zagolovok}>О нас</h1>
      <div className={classes.text__about}>
        <p>Мы занимаемся обменом криптовалют более 3х лет.</p>
        <p>Мы работаем ежедневно с 10:00 до 00:00 по МСК.</p>
        <p>Работаем только за наличные рубли.</p>
        <p>
          У нас вы можете купить USDT без комиссии по самому лучшему курсу в
          Грозном.
        </p>
        <p>
          Наш адрес: <br />
          Малгобекская улица 19, город Грозный
        </p>
        <p>
          Для получения консультации и покупки USDT Вам нужно создать
          заявку через бота.
        </p>
        <p>
          После составления заявки с Вами свяжется наш специалист 
          в порядке очереди. 
        </p>
      </div>
      <BtnBackHome/>
      </div>
    </div>
}