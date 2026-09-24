
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Pricing } from './pages/Pricing'
import { PageNotFound } from './pages/PageNotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
