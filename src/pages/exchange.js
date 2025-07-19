import {  useEffect, useState } from "react";
import { BtnBackHome } from "../button/buttonBackHome";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";

const token = process.env.REACT_APP_BOT_TOKEN;
const CHAT_ID_TG = process.env.REACT_APP_CHAT_ID;
const API = `https://api.telegram.org/bot${token}/sendMessage`;


const tg = window.Telegram.WebApp;



export default function ExchangePage(event) {
  const [selectBtnBuy, setSelectBtnBuy] = useState(false);
  const [selectBtnSell, setSelectBtnSell] = useState(false);
  const [selectBtnValue, setSelectBtnValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  
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
       const checkingTheNumbers = (value) => {
  if (value && value.length > 0 && value[1] !== '7') {
    value = '7' + value.slice(1);
  }
  setPhone(value);
};
      const onFocusBuy = (e) => {
         const valueBuy = e.target.value;
        setSelectBtnBuy(true);
        setSelectBtnSell(false); 
        setSelectBtnValue(valueBuy);
    };
    const onFocusSell = (e) => {
      const valueSell = e.target.value;
        setSelectBtnSell(true);
        setSelectBtnBuy(false); 
        setSelectBtnValue(valueSell); 
    };
       const sendEmailTelegram = async (event) =>{
            event.preventDefault();
            if(!selectBtnValue){
              toast.error("Выберите Покупку или Продажу")
              return
            }
            const form = event.target;
            const {first_name, last_name, phone, sum} = Object.fromEntries(new FormData(form).entries());
            const applicationForm = `Заявка на ${selectBtnValue}\nСумма: ${sum}₽\nИмя: ${first_name}\nФамилия: ${last_name}\nник телеграм: @${tg.initDataUnsafe?.user?.username}\nНомер телефона: ${phone} `;
            setIsLoading(true);
            console.log(applicationForm)
            try {
              let response = await fetch(API,{
                method: "POST",
                headers:{
                  'Content-Type':"application/json"
                }, 
                body: JSON.stringify({
                  chat_id: CHAT_ID_TG,
                  text: applicationForm,
                })
              });
              if(response.ok){
              toast.success("Заявка успешно отправлена");
              form.reset();
              }else{
                 toast.error("Заявка не отправлена");
              }
            } catch (error) {
                toast.error("Произошла ошибка: " + error.message);
            }finally{
              setIsLoading(false);
            }
       };

    return<div className="block__content__exchange">
      <div className="container__form">

        <h1>ОБМЕН</h1>
       <form onSubmit={sendEmailTelegram}>
          <div className="select">
            <button className={`btn__select__buy ${selectBtnBuy ? 'active__buy' : ''}`} onClick={onFocusBuy} type="button" id="buy" value="Покупку">Купить USDT</button>
            <button className={`btn__select__sell ${selectBtnSell ? "active__sell" : ''}`} onClick={onFocusSell} type="button" id="sell" value="Продажу">Продать USDT</button>
          </div>
          <input type="hidden" id="selectBtnValue" name="selectBtnValue" value={selectBtnValue} />
          
          <label>
          <h2 className="text_sum">Сумма в рублях</h2>
          <input className="sum" type="tel" id="sum"  name="sum" minLength="3"  placeholder="0"  required/>
        </label> 
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
         <PhoneInput
          country={"ru"}
          value={phone} 
          onChange={checkingTheNumbers}
          inputProps={{
            required: true,
            name:"phone",
            className:"phone",
            placeholder: "+7(XXX) XXX-XX-XX"
          }}
          />
          {/* <input type="tel" className="phone" id="phone"  name="phone" maxLength="16"  placeholder="+7 (XXX) XXX-XX-XX" required/> */}
        </label>
          <button type="submit" className="submit__btn">{isLoading ? `Отправка...`:`Отправить`}</button>
       </form>
        <BtnBackHome/>
        </div>
    </div>
}