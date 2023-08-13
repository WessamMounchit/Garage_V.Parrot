import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { onLogin } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
import secureLocalStorage from  "react-secure-storage";
import { Navigate } from 'react-router-dom';



const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const { email, password } = inputs

  const [redirectToHome, setRedirectToHome] = useState(false);

  const dispatch = useDispatch()


  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await onLogin({email, password})
       const { role, name } = response.data
 
      dispatch(authenticateUser())
      secureLocalStorage.setItem('isAuth', 'true')
      secureLocalStorage.setItem('role', role)
      secureLocalStorage.setItem('email', email)
      secureLocalStorage.setItem('name', name)

      toast.success(response.data.info)
      setRedirectToHome(true);
      
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.errors[0].msg)
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className='text-center my-5'>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='email'
          name='email'
          placeholder='email'
          className='form-control my-3'
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='form-control my-3'
          value={password}
          onChange={e => onChange(e)}
        />
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
    </>
  );
};

export default Login;
