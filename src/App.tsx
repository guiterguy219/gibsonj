import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import Home from './pages/home/Home';
import Painter from './pages/painter/Painter';

function App() {
  useEffect(() => {
    document.title = 'GibsonJ.net';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/painter" element={<Painter/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
