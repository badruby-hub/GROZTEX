"use client";
import { useEffect } from "react";
import  classes  from "./PopupWindow.module.css";

export default function PopUpWindow({children, closeModal}) {

    useEffect(()=>{
       document.body.style.overflow = "hidden";

       return ()=>{
        document.body.style.overflow = "auto";
       }
    },[]);

    return <div onClick={closeModal} className={classes.background__popup}>
        <div onClick={(e) => e.stopPropagation()}>
                {children}
        </div>
    </div>
}