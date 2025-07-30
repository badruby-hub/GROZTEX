import classes from "./loading.module.css";

export default function Loader(){
    return      <div className={classes.loaderWrapper}>
      <svg className={classes.spinner} viewBox="0 0 50 50" width="150" height="150" >
        <circle
          className={classes.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </svg>
      <div className={classes.text}>Загрузка</div>
    </div>
}