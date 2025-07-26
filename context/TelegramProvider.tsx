import React, { createContext, ReactNode } from "react";

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  // остальные методы...
}

interface TelegramContextType {
  tg: TelegramWebApp | null;
}

export const TelegramContext = createContext<TelegramContextType | null>(null);

interface TelegramProviderProps {
  tg: TelegramWebApp | null;
  children: ReactNode;
}

export function TelegramProvider({ tg, children }: TelegramProviderProps) {
  return (
    <TelegramContext.Provider value={{ tg }}>
      {children}
    </TelegramContext.Provider>
  );
}
