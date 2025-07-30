"use client";
import Loader from "@/components/Loader/Loader";
import AdminHeader from "./Header-admin";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function HeaderSwitcher() {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(()=>{
      const tg = window.Telegram.WebApp;
      const chatId =  tg?.initDataUnsafe?.user?.id;

         
    if (!chatId) {
      setIsAdmin(false);
      return;
    }

    fetch(`/api/user/admin?chatId=${chatId}`)
    .then(res=>res.json())
    .then(data=>{
        setIsAdmin(data.isAdmin);
    })
    .catch(() => {
        setIsAdmin(false);
      });

    },[]);
      
  if (isAdmin === null) return <Loader/>; 
  return isAdmin ? <AdminHeader /> : <Header />;

}