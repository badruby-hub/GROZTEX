import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { TelegramProvider } from "../context/TelegramProvider";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
export const metadata: Metadata = {
  title: "GROZTEX",
  description: "Лучший обменник",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const [tg, setTg] = useState<TelegramWebApp | null>(null);;

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      telegram.ready();
      telegram.expand();
      setTg(telegram);
    }
  }, []);
  return (
    <html lang="en">
       <head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js?58" 
          strategy="afterInteractive"/>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
           <div className="video-bg">
        <video className="video-bg__video" playsInline autoPlay loop muted preload='auto' src="/fon.mp4">
        </video>
         </div>   
         <Toaster/>
        <TelegramProvider tg={tg}>
            {children}
        </TelegramProvider>
      </body>
    </html>
  );
}
