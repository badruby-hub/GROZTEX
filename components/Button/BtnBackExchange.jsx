"use client";

import Link from "next/link";
import classes from "./button.module.css"


export default function BtnBackExchange(){
    return <div className={classes.btn__back__exchange}>
          <Link className={classes.link} href="/exchange">
           Назад
          </Link>
      </div>
}