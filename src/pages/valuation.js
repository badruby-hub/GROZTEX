import { BtnBackHome } from "../button/buttonBackHome";

export default function ValuationPage() {
    return<div className="block__content__valuation">
     <h1>КУРС USDT</h1>
     <div>
        <p>Покупка</p>
        <p>- ₽</p>
     </div>
     <div>
        <p>Продажа</p>
        <p>- ₽</p>
     </div>
     <p>Мы не берём никаких дополнительных комиссий с Вас</p>
     <BtnBackHome/>
    </div>
}