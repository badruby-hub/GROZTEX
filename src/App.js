import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from"./pages/Home.js";
import NoFoundPage from"./pages/NotFoundpage.js";
import AboutPage from"./pages/About.js";
import ExchangePage from"./pages/Exchange.js";
import RequestsPage from"./pages/Requests.js";
import SupportPage from"./pages/Support.js";
import ValuationPage from"./pages/Valuation.js";




export default function App() {

  return <>
  <div className="video-bg">
        <video className="video-bg__video" playsInline type='video/mp4'autoPlay loop muted preload='auto' src="./earth-fon.mp4">
        </video>
        <div className='effects'></div>
         </div>   
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/exchange' element={<ExchangePage/>}/>
      <Route path='/About' element={<AboutPage/>}/>
      <Route path='/requests' element={<RequestsPage/>}/>
      <Route path='/support' element={<SupportPage/>}/>
      <Route path='/valuation' element={<ValuationPage/>}/>
      <Route path='*' element={<NoFoundPage/>}/>
      <Route/>
    </Routes>
    </BrowserRouter>
  </>
}

