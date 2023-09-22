import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CarsSection from '../pages/CarsSection'
import Dashboard from '../pages/Dashboard'
import CarDetails from '../pages/CarDetails'
import Contact from '../pages/Contact'
import About from '../pages/About'
import { useSelector } from 'react-redux'

const Routers = () => {

  const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return <>{isAuth ? <Outlet /> : <Navigate to='/' />}</>
  }

  const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)

    return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
  }


  return (
    <Routes>

      <Route path='/' exact element={<Home />} />
      <Route path="/cars" element={<CarsSection />} />
      <Route path="/:carName/:carId" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' exact element={<Dashboard />} />
      </Route>

    </Routes>
  )
}

export default Routers