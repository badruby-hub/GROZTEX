import { useEffect } from "react";
import {Link} from "react-router-dom";
const tg = window.Telegram.WebApp;



export default function HomePage() {
      useEffect(()=>{
   tg.ready();
   tg.expand();
  },[])
  
  const onClose =()=>{
     tg.close()
  }

    return<>
       
        <div className="block__content__home">
           <div className="App">
             <div className='logo'><div className="logo__name">GROZ<img className="svg__logo" src="./logo.svg"/>EX</div></div>
             <ul>
              <li className='exchange'><Link className='link' to='/exchange'>Купить/Продать USDT</Link></li>
              <li className='about'><Link className='link' to='/about'>О нас</Link></li>
              <li className='requests'><Link className='link' to='/requests'>Все заявки</Link></li>
              <li className='support'><Link className='link' to='/support'>Поддержка</Link></li>
              <li className='valuation'><Link className='link' to='/valuation'>Курс</Link></li>
              <li onClick={onClose} className='close'><div className='btn__close'>Закрыть приложение</div></li>
             </ul>
           </div>
           
        </div>
        
    </>
}