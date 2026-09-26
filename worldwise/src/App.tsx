
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Homepage from './pages/Homepage'
import Product from './pages/Products'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout  from './pages/AppLayout'
import { CityList } from './components/CityList'
import CountryList from './components/CountryList'
import { City } from './components/City'

import type { Cities } from './types/Cities'


function App() {

  const [cities, setCities] = useState<Cities[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // using effect to load the data
  useEffect(() => {
    const controller = new AbortController()

    async function fetchCities() {
      setIsLoading(true)

      try {
        const resp = await fetch('http://localhost:3031/cities', {
          signal: controller.signal,
        })

        const data = await resp.json()
        setCities(data)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()

    return () => controller.abort()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Homepage />} />
        <Route path='/product' element={<Product/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/app' element={<AppLayout/>}>
          <Route  index element={<CityList cities = {cities} isLoading = {isLoading}/>}/>
          <Route  path='cities' element={<CityList cities = {cities} isLoading = {isLoading}/>}/>
          <Route  path='cities' element={<CityList cities = {cities} isLoading = {isLoading}/>}/>
          <Route  path='cities' element={<CityList cities = {cities} isLoading = {isLoading}/>}/>
          <Route  path='cities/:id' element={<City />}/>
          <Route  path='countries' element={<CountryList cities = {cities} isLoading = {isLoading}/>}/>
          <Route  path='form' element={<p>Form View</p>}/>
        </Route>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
