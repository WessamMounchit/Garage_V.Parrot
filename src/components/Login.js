import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { onLogin } from '../api/auth';


const Login = ({ setAuth }) => {
  const [role, setRole] = useState("")

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const { email, password } = inputs

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const response = await onLogin(loginData)
      setRole(response.data.role) /*test*/

      toast.success("login successfully!")

      if (response.token) {
        localStorage.setItem("token", response.token)
        setAuth(true)
      } else {
        setAuth(false)
      }
      
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.errors[0].msg)
    }
  };


  return (
    <>
      <h1 className='text-center my-5'>Login</h1>
      <p>salut l'{role}</p> {/* <== test */}
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
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
