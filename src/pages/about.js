import { useEffect } from "react";
import { BtnBackHome } from "../button/buttonBackHome";
const tg = window.Telegram.WebApp;
export default function AboutPage() {
    useEffect(()=>{
      tg.BackButton.show()
        return () => {
      tg.BackButton.hide();
    };
    },[])
  return (
    <div className="block__content__about">
      <div className="container__text">
      <h1>О нас</h1>
      <div className="text__about">
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
          г. Москва, Пресненская набережная 12, Башня Федерация. Восток, этаж 11
        </p>
        <p>
          Для получения пропуска к нам в офис и покупки USDT, вам нужно создать
          заявку через бота
        </p>
        <p>
          Гостевой пропуск выдается на ресепшене: На минус первом этаже с 8.00
          до 19.00 На первом этаже c 19.00 до 8.00.
        </p>
      </div>
      <BtnBackHome/>
      </div>
    </div>
  );
}
