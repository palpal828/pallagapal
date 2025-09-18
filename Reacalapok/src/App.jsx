import { useState } from 'react'
import { Button } from 'react-bootstrap';
import Home from './Home.jsx';
import Regiok from './Regiok.jsx';
import Torolni from './Torolni.jsx';
import Reg from './Reg.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <>
      
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/regiok' element={<Regiok />} />
          <Route path='/torolni' element={<Torolni />} />
          <Route path='/reg' element={<Reg />} />
        </Routes>
          
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
