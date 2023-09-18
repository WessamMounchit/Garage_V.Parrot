import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { onLogin } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../../redux/slices/authSlice';
import secureLocalStorage from "react-secure-storage";


const Login = ({ closeLoginModal }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const { email, password } = inputs

  const dispatch = useDispatch()


  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await onLogin({ email, password })
      const { role, name } = response.data

      dispatch(authenticateUser())
      secureLocalStorage.setItem('isAuth', 'true')
      secureLocalStorage.setItem('role', role)
      secureLocalStorage.setItem('email', email)
      secureLocalStorage.setItem('name', name)

      closeLoginModal()
      toast.success(response.data.info)

    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.errors[0].msg)
    }
  };


  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <label htmlFor="email">Adresse Email</label>
          <input
            type='email'
            name='email'
            id="email"
            placeholder='Adresse Email'
            className='form-control my-3'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type='password'
            name='password'
            id="password"
            placeholder='Mot de passe'
            className='form-control my-3'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <button className='custom__btn m-auto mt-5 form__btn'>Se connecter</button>
      </form>    </>
  );
};

export default Login;
