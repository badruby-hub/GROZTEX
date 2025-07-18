import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

import HomePage from "./pages/Home";
import NoFoundPage from "./pages/NotFoundpage";
import AboutPage from "./pages/about";
import ExchangePage from "./pages/exchange";
import RequestsPage from "./pages/requests";
import SupportPage from "./pages/support";
import ValuationPage from "./pages/valuation";





export default function App() {

  return <>
  <div className="video-bg">
        <video className="video-bg__video" playsInline type='video/mp4' autoPlay loop muted preload='auto' src="./earth-fon.mp4">
        </video>
         </div>   
         <Toaster/>
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

