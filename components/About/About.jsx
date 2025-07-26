'use client'
import { useTelegram } from "@/context/TelegramProvider";
import { useEffect } from "react";
import BtnBackHome from "@/components/Button/BtnBackHome"
import classes from "./about.module.css";
export default function About() {

    const tg = useTelegram();

    useEffect(()=>{
     if (!tg?.BackButton) return;
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

    return  <div className={classes.block__content__about}>
      <div className={classes.container__text}>
      <h1>О нас</h1>
      <div className={classes.text__about}>
        <p>Мы занимаемся обменом криптовалют более 3х лет.</p>
        <p>Работаем 24/7. При первом визите необходимо иметь паспорт.</p>
        <p>Работаем только за наличные рубли.</p>
        <p> Мы работаем стол в стол, т.е. не храним ваши средства у себя.</p>
        <p>
          У нас вы можете купить USDT без комиссии по самому лучшему курсу в
          Москве.
        </p>
        <p>
          Наш адрес: <br />
          Малгобекская улица, 19, Грозный, Республика Чечня
        </p>
        <p>
          Для получения консультации и покупки USDT, вам нужно создать
          заявку через бота
        </p>
        <p>
          После составления заявки с Вами свяжется наш специалист 
          в порядке очереди 
        </p>
      </div>
      <BtnBackHome/>
      </div>
    </div>
}