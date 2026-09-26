
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Product from './pages/Products'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout  from './pages/AppLayout'
import { CityList } from './components/CityList'
import { useState } from 'react'


function App() {

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Homepage />} />
        <Route path='/product' element={<Product/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/app' element={<AppLayout/>}>
          <Route  index element={<CityList />}/>
          <Route  path='cities' element={<CityList />}/>
          <Route  path='countries' element={<p>List of Country</p>}/>
          <Route  path='form' element={<p>Form View</p>}/>
        </Route>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
