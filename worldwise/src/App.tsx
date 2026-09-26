
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Product from './pages/Products'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout  from './pages/AppLayout'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Homepage />} />
        <Route path='/product' element={<Product/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/app' element={<AppLayout/>}>
          <Route  index element={<p>List of Cities</p>}/>
          <Route  path='cities' element={<p>List of Cities</p>}/>
          <Route  path='country' element={<p>List of Country</p>}/>
          <Route  path='form' element={<p>Form View</p>}/>
        </Route>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
