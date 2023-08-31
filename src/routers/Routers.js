import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from '../pages/Home'
import CarsSection from '../components/UI/CarsSection'
import Dashboard from '../pages/Dashboard'
import CarDetails from '../pages/CarDetails'

const Routers = () => {
  return (
    <Routes>
        


        <Route path='/' exact element={<Home />} />
        <Route path="/cars" element={<CarsSection />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path="/car/:carId" element={<CarDetails />} />

      </Routes>
  )
}

export default Routers