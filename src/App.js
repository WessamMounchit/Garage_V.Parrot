import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux'

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


      <Route element={<PrivateRoutes />}>
          <Route path='/' exact element={<Dashboard />} />
          <Route path='/register' exact element={<Register />} />
      </Route>

      <Route element={<RestrictedRoutes />}>
        <Route path='/home' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
      </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;