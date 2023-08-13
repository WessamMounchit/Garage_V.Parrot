import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { onEmployeeRegistration } from '../api/auth';

const Register = ({ closeRegisterModal }) => {
  
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
        closeRegisterModal()
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
          Enregister l'employé
        </button>
      </form>
    </>
  );
};

export default Register;
