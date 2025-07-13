
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
        <video className="video-bg.mp4" type="video/mp4" autoPlay loop muted src="earth-fon.mp4"></video>
        <div className='effects'></div>
        <div className="video-bg__content">
           <div className="App">
             <h1>work</h1>
             <button onClick={onClose}>закрыть</button>
           </div>
        </div>
    </div>   
   
  );
}

export default App;
