import React from 'react'
import About from './components/pages/about'
import Contact from './components/pages/contact'
import Home from './components/pages/home'
import Services from './components/pages/services'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar'
import './App.css'

function App() {
  

  return (
    <>
      <Navbar />
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/services' element={<Services/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
