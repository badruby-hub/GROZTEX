import Link from "next/link";
import classes from "./button.module.css"


export default function BtnBackHome(){
    return <div className={classes.btn__back__home}>
          <Link className={classes.link} href="/">
            Перейти на главную страницу
          </Link>
      </div>
}