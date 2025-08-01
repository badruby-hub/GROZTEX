"use client";
import { useEffect } from "react";
import classes from "./rules.module.css";
import BtnBackExchange from "../Button/BtnBackExchange";

export default function Rules() {

      useEffect(()=>{
        
        const tg = window.Telegram.WebApp;
         tg.BackButton.show();

         const btnBackClick=()=>{
                window.history.back()
         };
   
         tg.BackButton.onClick(btnBackClick);
   
           return () => {
         tg.BackButton.hide();
         tg.BackButton.offClick(btnBackClick);
       };
       },[])

    return <div className={classes.container__rules}>
        <div className={classes.block__rules}>
        <h1 className={classes.zagolovok} >Правила</h1>
        <ol className={classes.conditions__buy}>
            <li>Покупка USDT осуществляется у лиц строго старше 18 лет.</li>
            <li>Запрещено продавать USDT для третьих лиц.</li>
            <li>При продаже при себе иметь паспорт.</li>
            <li>При первой продаже необходимо пройти верификацию.</li>
        </ol>
        <h2 className={classes.zagolovok__two}>Продажа</h2>
         <ol className={classes.conditions__sell}>
            <li>Покупка USDT осуществляется у лиц строго старше 18 лет.</li>
            <li>Запрещено продавать USDT для третьих лиц.</li>
            <li>При продаже при себе иметь паспорт.</li>
            <li>При первой продаже необходимо пройти верификацию.</li>
        </ol>
        <p>Минимальная сумма 300 USDT, платежи меньшей этой суммы обработаны не будут.</p>
        <p>Максимальная сумма 100 000 USDT, платежи больше этой суммы обработаны не будут</p>
        <p>Мы принимаем USDT, только в сети TRC-20.</p>
        <p>Будьте внимательны, мы не несем ответственности за USDT, отправленные не в сети блокчейна TRON.</p>
        <p>При зачисление USDT к нам на баланс, будет произведен автоматический обмен по текущему курсу.</p>
        <p>Срок зачисления USDT в сети TRON занимает от 3 до 10 минут.</p>
    </div>
    <BtnBackExchange/>
    </div>
}