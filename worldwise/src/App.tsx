
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import { Products } from './pages/Products'
import { Pricing } from './pages/Pricing.tsx'
import { PageNotFound } from './pages/PageNotFound.tsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Homepage />} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
