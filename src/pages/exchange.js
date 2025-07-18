import { useEffect, useState } from "react";
import { BtnBackHome } from "../button/buttonBackHome";
const tg = window.Telegram.WebApp;
export default function ExchangePage() {
  const [selectBtnBuy, setSelectBtnBuy] = useState(false);
  const [selectBtnSell, setSelectBtnSell] = useState(false);
  const [selectBtnValue, setSelectBtnValue] = useState("");
      useEffect(()=>{
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
      const onFocusBuy = (e) => {
         const valueBuy = e.target.value;
        setSelectBtnBuy(true);
        setSelectBtnSell(false); 
        setSelectBtnValue(valueBuy);
        console.log( "купить",selectBtnValue)
    };
    const onFocusSell = (e) => {
      const valueSell = e.target.value;
        setSelectBtnSell(true);
        setSelectBtnBuy(false); 
        setSelectBtnValue(valueSell); 
        console.log("продать",selectBtnValue)
    };
       
    return<div className="block__content__exchange">
      <div className="container__form">
        <h1>ОБМЕН</h1>
       <form>
          <div className="select">
            <button className={`btn__select__buy ${selectBtnBuy ? 'active__buy' : ''}`} onClick={onFocusBuy} type="button" value="Купить">Купить USDT</button>
            <button className={`btn__select__sell ${selectBtnSell ? "active__sell" : ''}`} onClick={onFocusSell} type="button" value="Продать">Продать USDT</button>
          </div>
         <label>
          <h2>Имя</h2>
          <input className="first__name" type="text" id="first__name"  name="first_name" minLength="3"  placeholder="Введите ваше имя"  required/>
        </label>
       
       
          <label>
          <h2>Фамилия</h2>
          <input type="text" className="last__name" id="last__name"  name="last_name" minLength="3" placeholder="Введите вашу фамилию" required/>
        </label>
      
         <label>
          <h2>номер телефона </h2>
          <input type="tel" className="phone" id="phone" autoComplete="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+7 (XXX) XXX-XX-XX" required/>
        </label>
          <button type="submit" className="submit__btn">Отправить заявку</button>
       </form>
        <BtnBackHome/>
        </div>
    </div>
}