import { Link } from "react-router-dom";
import { BtnChatTg } from "../button/btnChatTg";
import { BtnBackHome } from "../button/buttonBackHome";

export default function SupportPage() {
    return<div className="block__content__support">
        <div className="container__text__support">
  <h1>Поддержка</h1>
  <div className="text__support">
     <p> Наша операторы на связи 24/7. Готовы ответить на любые вопросы.</p>
     <p> Для покупки USDT, вам нужно создать заявку через бота</p>
     <p> Для связи с нами напишите в Telegram канал —<Link className="link__tg" to="https://t.me/gess13">@gess13</Link></p>
  </div>
     <BtnChatTg/>
     <BtnBackHome/>
        </div>
   
    </div>
}