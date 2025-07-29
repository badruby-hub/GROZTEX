import classes from "./loading.module.css";


export default function Loader() {
    return <div className={classicNameResolver.wrapper}>
    <div className={`${classes.content} ${classes.is__loading}`}>

    </div>
</div>
}
