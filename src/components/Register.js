import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onEmployeeRegistration } from '../api/auth';

const Register = () => {
  
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const registrationData = { email, password, name };
      const response = await onEmployeeRegistration(registrationData);

      if (response.data.success) {
        toast.success(response.data.message)
      } else {
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.errors[0].msg);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={onChange}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={onChange}
        />
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
      </form>
      <Link to='/login'>
        <button type="button" className="btn btn-primary m-2">
          Login
        </button>
      </Link>
    </>
  );
};

export default Register;
