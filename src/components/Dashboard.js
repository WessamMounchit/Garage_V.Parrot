import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { unauthenticateUser } from '../redux/slices/authSlice';
import secureLocalStorage from 'react-secure-storage';


const Dashboard = () => {

  const dispatch = useDispatch()

  const name = secureLocalStorage.getItem('name')

  const logout = (e) => {
    e.preventDefault()
    secureLocalStorage.clear()
    dispatch(unauthenticateUser())
    toast.success("Deconnexion realisée avec succès")
  }

  return (
    <>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button className="btn btn-primary" onClick={e => logout(e)}>
        Logout
      </button>
    </>
  )
}

export default Dashboard