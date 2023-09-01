import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CarsSection from '../pages/CarsSection'
import Dashboard from '../pages/Dashboard'
import CarDetails from '../pages/CarDetails'
import Contact from '../pages/Contact'
import About from '../pages/About'

const Routers = () => {
  return (
    <Routes>

        <Route path='/' exact element={<Home />} />
        <Route path="/cars" element={<CarsSection />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path="/car/:carId" element={<CarDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />


      </Routes>
  )
}

export default Routers