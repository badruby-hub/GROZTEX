import { Link } from "react-router-dom";

export function BtnBackHome(){
   return   <div className="btn__back__home">
          <Link className="link" to="/">
            Перейти на главную страницу
          </Link>
      </div>
}