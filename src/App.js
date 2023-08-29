import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import { useSelector } from 'react-redux'
import CarDetails from './pages/CarDetails';
import Dashboard from './pages/Dashboard';

function App() {

  const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
  }

  const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)

    return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>


        <Route path='/' exact element={<Home />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path="/car/:carId" element={<CarDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;