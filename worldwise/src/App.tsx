
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense} from 'react'

import './App.css'
import { CitiesProvider } from './context/CityContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'
import SpinnerFullPage from './components/SpinnerFullPage'

const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Products'))
const Pricing = lazy(() => import('./pages/Pricing'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const CityList = lazy(async () => {
  const module = await import('./components/CityList')
  return { default: module.CityList }
})
const City = lazy(async () => {
  const module = await import('./components/City')
  return { default: module.City }
})
const CountryList = lazy(() => import('./components/CountryList'))
const Form = lazy(() => import('./components/Form'))




function App() {

  return (
    <AuthProvider>
      <CitiesProvider >
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={ <Homepage />} />
              <Route path='/product' element={<Product/>}/>
              <Route path='/pricing' element={<Pricing/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/app' element={<ProtectedRoutes><AppLayout/></ProtectedRoutes>}>
                <Route  index element={<Navigate to='cities'/>}/>
                <Route  path='cities' element={<CityList />}/>
                <Route  path='cities/:id' element={<City />}/>
                <Route  path='countries' element={<CountryList/>}/>
                <Route  path='form' element={<Form />}/>
              </Route>
              <Route path='/*' element={<PageNotFound/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
