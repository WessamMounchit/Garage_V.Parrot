import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { unauthenticateUser } from '../redux/slices/authSlice';
import secureLocalStorage from 'react-secure-storage';
import { onLogout } from '../api/auth';


const Dashboard = () => {

  const dispatch = useDispatch()

  const name = secureLocalStorage.getItem('name')

  const logout = async e => {
    try {
      e.preventDefault()

      const response = await onLogout()
      console.log(response)
      secureLocalStorage.clear()
      dispatch(unauthenticateUser())

      toast.success(response.data.message)

    } catch (error) {
      console.error(error.message);
    }
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