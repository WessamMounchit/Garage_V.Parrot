import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { onEmployeeRegistration } from '../../../api/auth';

const Register = ({ closeRegisterModal, onSubmit }) => {
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

      //closeRegisterModal();
      onSubmit()
      toast.success("Compte employé créer avec succès");
      }

    } catch (error) {
      console.error(error.message);
      toast.error("erreur lors la création du compte employé");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <label htmlFor="email">Adresse Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Adresse Email"
            className="form-control my-3"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            className="form-control my-3"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom"
            className="form-control my-3"
            value={name}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="custom__btn m-auto mt-5 form__btn">
          Enregistrer l'employé
        </button>
      </form>
    </>
  );
};

export default Register;
