"use client"
import BtnBackHome from "@/components/Button/BtnBackHome";
import classes from "./exchange.module.css"
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { useContext, useEffect, useState } from "react";
import { webAppContext } from "@/app/context/context";


const token = process.env.NEXT_PUBLIC_BOT_TOKEN;
const CHAT_ID_TG = process.env.NEXT_PUBLIC_CHAT_ID;
const API = `https://api.telegram.org/bot${token}/sendMessage`;

export default function Exchange() {
   const tg = useContext(webAppContext);
     const [selectBtnBuy, setSelectBtnBuy] = useState(false);
  const [selectBtnSell, setSelectBtnSell] = useState(false);
  const [selectBtnValue, setSelectBtnValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [phone, setPhone] = useState("");


    const USER_CHAT_ID_TG = tg.initDataUnsafe?.user?.id ;
    const resetForm=()=>{
              setSelectBtnBuy(false);
              setSelectBtnSell(false);
              setSelectBtnValue("");
              setCount("");
              setFirstName("");
              setLastName("");
              setPhone("");
   };


      useEffect(()=>{
         tg.BackButton.show();
         const btnBackClick=()=>{
                tg.history.back()
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
    const formatCountChange=(event)=>{
         const value = event.target.value;
         const numberValue = Number(value.replace(/\s/g, ''));
         if (!isNaN(numberValue)) {
           setCount(numberValue.toLocaleString('ru-RU'));
         }else{
           setCount('');
         }
    };
    const formatFirstName = (event)=>{
        const value = event.target.value;
        const stringFormat = String(value.replace(/[^а-яА-ЯёЁ]/g, ''));
          setFirstName(stringFormat);
    };

        const formatLastName = (event)=>{
        const value = event.target.value;
        const stringFormat = String(value.replace(/[^а-яА-ЯёЁ]/g, ''));
          setLastName(stringFormat);

    };

  const sendEmailTelegram = async (event) =>{
            event.preventDefault();
            if(!tg?.initDataUnsafe?.user){
              toast.error("Для отправки заявки, войдите в мини приложение через телеграм",{
                 style: {
                     border: '1px solid rgb(246, 2, 35)',
                     padding: '16px',
                     color: 'rgb(246, 2, 35)',
                     },
                 iconTheme: {
                     primary: 'rgb(246, 2, 35)',
                     secondary: '#FFFAEE',
                },
              })
              return
            }
            if(!selectBtnValue){
              toast.error("Выберите Покупку или Продажу")
              return
            }
            const form = event.target;
            const {first_name, last_name, phone, sum} = Object.fromEntries(new FormData(form).entries());
            const applicationForm = `Заявка на ${selectBtnValue}\nСумма: ${sum}₽\nИмя: ${first_name}\nФамилия: ${last_name}\nНик телеграм: @${tg?.initDataUnsafe?.user?.username}\nНомер телефона: ${phone}\n`;
            const notificationForm = `Оформлена заявка на ${selectBtnValue}.\n\nСумма в размере: ${sum}₽.\n\nВ ближайшее время с Вами свяжется наш специалист для дальнейшего обсуждения.\n\nСпасибо за обращение!\nС уважением,\n  GROZTEX`;
            setIsLoading(true);
            
            console.log(`${applicationForm}`)
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
                await fetch(API,{
                method: "POST",
                headers:{
                  'Content-Type':"application/json"
                }, 
                body: JSON.stringify({
                  chat_id: USER_CHAT_ID_TG,
                  text: notificationForm,
                })
              })
              toast.success("Заявка успешно отправлена");
              form.reset();
              resetForm();
              }else{
                 toast.error("Заявка не отправлена");
              }
            } catch (error) {
                toast.error("Произошла ошибка: " + error.message);
            }finally{
              setIsLoading(false);
            }
       };


    return <div className={classes.block__content__exchange}>
      <div className={classes.container__form}>

        <h1 className={classes.zagolovok}>ОБМЕН</h1>
       <form onSubmit={sendEmailTelegram}>
          <div className={classes.select}>
            <button className={`${classes.btn__select__buy} ${selectBtnBuy ? classes.active__buy : ''}`} onClick={onFocusBuy} type="button" id="buy" value="Покупку">Купить USDT</button>
            <button className={`${classes.btn__select__sell} ${selectBtnSell ? classes.active__sell : ''}`} onClick={onFocusSell} type="button" id="sell" value="Продажу">Продать USDT</button>
          </div>
          <input className={`${classes.input}`} type="hidden" id="selectBtnValue" name="selectBtnValue" value={selectBtnValue} />
          <label className={classes.label}>
          <h2 className={`${classes.text_sum}`}>Сумма в рублях</h2>
          <input className={`${classes.sum} ${classes.input}`} type="tel" id="sum"  name="sum" minLength="3"  placeholder="0" value={count} onChange={formatCountChange} required/>
        </label > 
         <label className={classes.label}>
          <h2 className={classes.zagolovok__two}>Имя</h2>
          <input className={`${classes.first__name} ${classes.input}`} value={firstName} onChange={formatFirstName} type="text" id="first__name"  name="first_name" minLength="3"  placeholder="Введите ваше имя"  required/>
        </label>
          <label className={classes.label}>
          <h2 className={classes.zagolovok__two}>Фамилия</h2>
          <input type="text" className={`${classes.last__name} ${classes.input}`} value={lastName} onChange={formatLastName} id="last__name"  name="last_name" minLength="3" placeholder="Введите вашу фамилию" required/>
        </label>
         <label className={classes.label}>
          <h2 className={classes.zagolovok__two}>номер телефона </h2>
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
        </label>
          <button type="submit" className={classes.submit__btn}>{isLoading ? `Отправка...`:`Отправить`}</button>
       </form>
        <BtnBackHome/>
        </div>
    </div>
}