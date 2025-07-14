
import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  useEffect(()=>{
   tg.ready()
  },[])
  
  const onClose =()=>{
     tg.close()
  }
  return (
       <div className="video-bg">
        <video className="video-bg__video"  autoPlay loop muted preload='auto' src="./earth-fon.mp4"></video>
        <div className='effects'></div>
        <div className="video-bg__content">
           <div className="App">
             <div className='logo'>GROZ⍑EX</div>
             <ul>
              <li className='exchange'><a className='link' href='/Exchange'>Купить/Продать USDT</a></li>
              <li className='about'><a className='link' href='/About'>О нас</a></li>
              <li className='requests'><a className='link' href='/Requests'>Все заявки</a></li>
              <li className='support'><a className='link' href='/Support'>Поддержка</a></li>
              <li className='valuation'><a className='link' href='/Valuation'>Курс</a></li>
              <li className='close'><button className='btn__close' onClick={onClose}>закрыть</button></li>
             </ul>
           </div>
           
        </div>
    </div>   
   
  );
}

export default App;
