import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = ({ setAuth }) => {

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
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token)

        setAuth(true)
        toast.success("login successfully!")
      } else {
        setAuth(false)
        toast.error(parseRes)
      }

    } catch (err) {
      console.error(err.message);
    }
  };


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
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
