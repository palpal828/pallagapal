import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import Tablaz from './Tablaz.jsx'
import Navig from './components/navig.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navig />
    <BrowserRouter>
      <Routes>
        <Route path='/uj' element={<App />}/>
        <Route path='/' element={<Tablaz />}/>
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
