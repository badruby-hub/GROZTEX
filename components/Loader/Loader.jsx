import classes from "./loading.module.css";

export default function Loader(){
    return <div class={classes.circ}>
  <div class={classes.load}>Загрузка . . . </div>
  <div class={classes.hands}></div>
  <div class={classes.body}></div>
  <div class={classes.head}>
    <div class={classes.eye}></div>
  </div>
</div>
}