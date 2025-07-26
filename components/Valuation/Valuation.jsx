import classes from "./valuation.module.css"
import BtnBackHome from "@/components/Button/BtnBackHome"

export default function Valuation() {
    return <div className={classes.block__content__valuation}>
      <div className={classes.container__valuation}>
        <h1 className={classes.zagolovok}>КУРС USDT</h1>
          <div className={classes.container__buy}>
            <p className={classes.buy}>Покупка</p>
            <p className={classes.well}>78.55 ₽</p>
          </div>
          <div className={classes.container__sell}>
            <p className={classes.sell}>Продажа</p>
            <p className={classes.well}>78 ₽</p>
          </div>
          <p>Мы не берём никаких дополнительных комиссий с Вас</p>
          <BtnBackHome/>
      </div>
    </div>
}