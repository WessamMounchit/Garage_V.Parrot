import React, { useState } from "react";
import { onUpdateEmployee } from "../../../api/employee";
import { toast } from "react-toastify";

const EditEmployeeInfos = ({ employee, onSubmit }) => {
  const [newName, setNewName] = useState(employee.user_name);
  const [newEmail, setNewEmail] = useState(employee.user_email);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = async () => {
    const updatedEmployee = {
      email: employee.user_email,
      name: newName,
      newEmail: newEmail,
    };

    try {
      await onUpdateEmployee(employee.user_id, updatedEmployee);
      onSubmit();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="newName" className="form-label">
          Nouveau nom :
        </label>
        <input
          type="text"
          className="form-control"
          id="newName"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newEmail" className="form-label">
          Nouveau email :
        </label>
        <input
          type="email"
          className="form-control"
          id="newEmail"
          value={newEmail}
          onChange={handleEmailChange}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Enregistrer
      </button>
    </div>
  );
};

export default EditEmployeeInfos;
