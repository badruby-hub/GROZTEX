"use client";
import PopUpWindow from "./popupWindow/PopupWindow";
import { useState } from "react";
import classes from "./Newsletter.module.css";
import toast from "react-hot-toast";

export default function Sendletter() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const sendNewsLetter = async (event) => {
    const tg = window.Telegram.WebApp;
    const USER_CHAT_ID_TG = tg.initDataUnsafe?.user?.id;
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

    try {
      const response = await fetch("api/requests/send/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: message,
          senderChatId: USER_CHAT_ID_TG,
        }),
      });

      const data = await response.json();

      if(data.sent > 0){
         toast.success(`Сообщение доставлено ${data.sent} пользователям`,{
            duration: 8000
         });
         console.log(`Сообщение доставлено ${data.sent} пользователям`);
      }

      if(data.removed > 0){
         toast.error(`Сообщение не доставлено ${data.removed} пользователям\nудалили тг бот`,{
            duration: 8000
         });
         console.log(`Сообщение не доставлено ${data.removed} пользователям\nудалили тг бот`);
      }
      setMessage("");

    } catch (error) {
      console.log("Произошла ошибка: " + error.message)
      toast.error("Произошла ошибка: " + error.message);
    }
  };


  return (
    <div className={classes.block__popup}>
      <button className={classes.btn__open__window} onClick={() => setOpen(open === false ? true : false)}>
        Рассылка
      </button>
      {open && (
        <PopUpWindow closeModal={() => setOpen(false)}>
          <form className={classes.form} onSubmit={sendNewsLetter}>
            <label htmlFor="spam-text">
              <textarea
                className={classes.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="text"
                type="text"
                id="spam-text"
              ></textarea>
            </label>
            <button className={classes.submit} type="submit">отправить</button>
          </form>
        </PopUpWindow>
      )}
    </div>
  );
}
