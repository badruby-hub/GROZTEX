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
             <div className='logo'><div className="logo__name">GROZ
             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="85" height="80" viewBox="0 0 48 48">
             <polygon fill="#4db6ac" points="24,44 2,22.5 10,5 38,5 46,22.5"></polygon>
             <path fill="#fff" d="M38,22c0-1.436-4.711-2.635-11-2.929V16h8v-6H13v6h8v3.071C14.711,19.365,10,20.564,10,22
             s4.711,2.635,11,2.929V36h6V24.929C33.289,24.635,38,23.436,38,22z M24,24c-6.627,0-12-1.007-12-2.25c0-1.048,3.827-1.926,9-2.176
             v3.346c0.96,0.06,1.96,0.08,3,0.08s2.04-0.02,3-0.08v-3.346c5.173,0.25,9,1.128,9,2.176C36,22.993,30.627,24,24,24z"></path>
             </svg>EX</div>
             <div className="logo__title">best exchange</div></div>
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