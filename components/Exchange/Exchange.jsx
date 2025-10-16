"use client"
import BtnBackHome from "@/components/Button/BtnBackHome";
import classes from "./exchange.module.css"
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import {  useEffect, useState } from "react";
import Link from "next/link";


export default function Exchange({rate}) {
  const {buy, sell} = rate || null ; 
  const [convertedSum, setConvertedSum] = useState('');
  const validCharsTron = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const [selectBtnBuy, setSelectBtnBuy] = useState(false);
  const [selectBtnSell, setSelectBtnSell] = useState(false);
  const [selectBtnValue, setSelectBtnValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState("");
  const [firstName,setFirstName] = useState("");
  //const [lastName,setLastName] = useState(""); // заполнение фамилии 
  const [phone, setPhone] = useState("");
  const [chatId, setChatId] = useState(null);
  const [addressTron, setAddressTron] = useState("");
  const [rulesChecked, setRulesChecked] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("RUB");
  
  const resetForm=()=>{
              setSelectBtnBuy(false);
              setSelectBtnSell(false);
              setSelectBtnValue("");
              setCount("");
              setFirstName("");
              // setLastName("");
              setPhone("");
   };


      useEffect(()=>{

        const tg = window.Telegram.WebApp;
         tg.BackButton.show();

         const chatId =  tg.initDataUnsafe?.user?.id 
               setChatId(chatId);


         const btnBackClick=()=>{
                window.history.back()
         };
   
         tg.BackButton.onClick(btnBackClick);
   
           return () => {
         tg.BackButton.hide();
         tg.BackButton.offClick(btnBackClick);
       };
        




       },[selectBtnBuy,selectBtnSell]);

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
        setSelectedCurrency("RUB");
    };
    const onFocusSell = (e) => {
      const valueSell = e.target.value;
        setSelectBtnSell(true);
        setSelectBtnBuy(false); 
        setSelectBtnValue(valueSell); 
        setSelectedCurrency("USDT");
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

      useEffect(()=>{
          const numericCount = Number(count.replace(/\s/g, ""));
                 if (!numericCount || numericCount <= 0) {
                   setConvertedSum('');
                   return;
                   }
            // конвертация на покупку 
     let result = 0;
      if (selectBtnBuy && buy) {
        result = numericCount / parseFloat(buy);
      }// конвертация на продажу 
     else if (selectBtnSell && sell) {
       result = numericCount * parseFloat(sell); 
     }
     setConvertedSum(result ? result.toFixed(2): '');

       },[count,selectBtnBuy,selectBtnSell,buy,sell]);


//форма заполнения фамилии 
    //     const formatLastName = (event)=>{
    //     const value = event.target.value;
    //     const stringFormat = String(value.replace(/[^а-яА-ЯёЁ]/g, ''));
    //       setLastName(stringFormat);

    // };

        const formatTRON = (event)=>{
         const value = event.target.value;
         const text = value.replace(/\s+/g, '');
         let filtered = '';


         for (const char of text) {
          if (validCharsTron.includes(char)) {
             filtered += char;
          }
         }

          if (filtered.length > 0 && filtered[0] !== 'T') {
                filtered = 'T' + filtered.slice(1);
          }

          
           setAddressTron(filtered);
        };

  const sendEmailTelegram = async (event) =>{
    const tg = window.Telegram.WebApp;
    const USER_CHAT_ID_TG = tg.initDataUnsafe?.user?.id ;
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
            const {first_name, last_name, phone, sum, addressTron} = Object.fromEntries(new FormData(form).entries());
               
            const payload = {
                    authorId: chatId, 
                    status: "PENDING",
                    sum: sum,
                    firstName: first_name,
                    lastName: last_name,
                   };
                   
            let walletInfo = '';

            const resRequest = await fetch("api/requests", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
              },
            body: JSON.stringify(payload),
            });
             if (!resRequest.ok) throw new Error("Ошибка создания заявки");

             const createdRequest = await resRequest.json();
             const number = createdRequest.number; 
            
            if(selectBtnBuy){
                walletInfo = `Сеть: TRON (TRC20)\nНомер кошелька: ${addressTron}`
               }
//Фамилия: ${last_name}
const applicationForm = `
Заявка (${number}) на ${selectBtnValue}
Сумма: ${sum}${selectedCurrency === "RUB" ? "RUB" : "USDT"}
Общая сумма выплаты: ${convertedSum}${selectedCurrency === "RUB" ? "USDT" : "RUB"}
Имя: ${first_name}
Ник телеграм: @${tg?.initDataUnsafe?.user?.username}
Номер телефона: ${phone}

${walletInfo}`;


const notificationForm = `
Оформлена заявка (${number}) на ${selectBtnValue}.
Сумма в размере: ${sum}${selectedCurrency === "RUB" ? "RUB" : "USDT"}
Сумма выплаты: ${convertedSum}${selectedCurrency === "RUB" ? "USDT" : "RUB"}
В ближайшее время с Вами свяжется наш специалист для дальнейшего обсуждения.
Спасибо за обращение!

С уважением,
  GROZTEX`;



            setIsLoading(true);
            
            try {
           const response = await fetch("/api/requests/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                   adminMessage: applicationForm,
                   userMessage: notificationForm,
                   userChatId: USER_CHAT_ID_TG
                }),
              });
              if(response.ok){
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
          <h2 className={`${classes.text_sum}`}>Сумма в {selectedCurrency === "RUB" ? "RUB" : "USDT"}</h2>
          <input className={`${classes.sum} ${classes.input}`} type="tel" id="sum"  name="sum" minLength="3" maxLength="8" placeholder="0" value={count} onChange={formatCountChange} required/>
        </label > 
        {
         Number(count.replace(/\s/g, ""))  > 0  ? <label className={classes.label}>
              <h2 className={classes.zagolovok__two}>Общая сумма по курсу <span className={classes.value__buy__sell}>{selectedCurrency === "RUB" ? buy : sell}</span></h2>
              <input className={`${classes.sum} ${classes.input}`} type="tel" id="count__sum" name="count__sum" value={`${convertedSum} ${Number(count.replace(/\s/g, ""))  > 0  ? "" : selectedCurrency === "RUB" ? "USDT" : "RUB"}`} readOnly/>
        </label> : null
        }
     
       { selectBtnBuy ? <label className={classes.label} >
          <h2 className={classes.zagolovok__two}>Кошелёк TRC-20</h2>
          <input className={`${classes.wallet__tron} ${classes.input}`} value={addressTron} onChange={formatTRON} type="text" id="wallet__tron"  name="addressTron" minLength="34" maxLength="34"  placeholder="Введите ваш кошелёк (34 символа)"  required/> 
        </label> : null }
         <label className={classes.label}>
          <h2 className={classes.zagolovok__two}>Имя</h2>
          <input className={`${classes.first__name} ${classes.input}`} value={firstName} onChange={formatFirstName} type="text" id="first__name"  name="first_name" minLength="3"  placeholder="Введите ваше имя"  required/>
        </label>
          {/* <label className={classes.label}>
          <h2 className={classes.zagolovok__two}>Фамилия</h2>
          <input type="text" className={`${classes.last__name} ${classes.input}`} value={lastName} onChange={formatLastName} id="last__name"  name="last_name" minLength="3" placeholder="Введите вашу фамилию" required/>
        </label> */}
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
       <div className={classes.block__rules}>
  <label className={classes.checkboxWrapper}>
       <input
      type="checkbox"
      name="rules"
      id="rules"
      className={classes.hiddenCheckbox}
      checked={rulesChecked}
      onChange={(e) => setRulesChecked(e.target.checked)}
    />
    <span className={classes.roundCheckbox}></span>
         <span>
          Я прочитал <Link className={classes.link} href="/rules">правила</Link> и принимаю условия сервиса
        </span>
      </label>
      </div>

      <button type="submit" className={classes.submit__btn} disabled={!rulesChecked || isLoading}>{isLoading ? `Отправка...`:`Отправить`}</button>
       </form>
        <BtnBackHome/>
        </div>
    </div>
}