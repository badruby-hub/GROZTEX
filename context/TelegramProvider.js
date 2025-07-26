"use client";
import { createContext, useContext, useEffect, useState } from "react";

const TelegramContext = createContext(null);

export const TelegramProvider = ({ children }) => {
  const [tg, setTg] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const telegram = window.Telegram?.WebApp;
      if (telegram) {
        telegram.ready();
        telegram.expand();
        setTg(telegram);
      }
    }
  }, []);

  return (
    <TelegramContext.Provider value={tg}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
