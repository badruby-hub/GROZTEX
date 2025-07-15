import { BtnBackHome } from "../button/buttonBackHome";

export default function ValuationPage() {
  return (
    <div className="block__content__valuation">
      <div className="container__valuation">
        <h1>КУРС USDT</h1>
          <div className="container__buy">
            <p className="buy">Покупка</p>
            <p className="well">78.55 ₽</p>
          </div>
          <div className="container__sell">
            <p className="sell">Продажа</p>
            <p className="well">78 ₽</p>
          </div>
          <p>Мы не берём никаких дополнительных комиссий с Вас</p>
          <BtnBackHome />
      </div>
    </div>
  );
}
