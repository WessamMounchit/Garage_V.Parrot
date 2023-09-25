import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import fetchData from "../../../utils/fetchData";
import { deleteEmployee, getEmployees } from "../../../api/employee";
import { toast } from "react-toastify";
import CustomModal from "../../UI/CustomModal";
import EditEmployeeInfos from "./EditEmployeeInfos";
import Register from "./Register";

const UsersAdmin = () => {
  //////////  STATE   //////////

  const [employee, setEmployee] = useState({
    loading: false,
    error: false,
    data: undefined,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchData(setEmployee, getEmployees);
  }, []);

  //////////  HANDLE MODALS   //////////

  const handleModalOpen = (employee) => {
    setSelectedEmployee({ ...employee });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedEmployee(null);
    setIsUpdateModalOpen(false);
  };

  //////////  API   //////////

  const handleAddEmployee = () => {
    try {
      fetchData(setEmployee, getEmployees);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      fetchData(setEmployee, getEmployees);
      toast.success("Les infos de l'employé ont été mis à jour");
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await deleteEmployee(id);
      toast.success(response.data.info);
    } catch (error) {
      toast.error(error.response.data.error);
    }
    fetchData(setEmployee, getEmployees);
  };

  const addIcon = (
    <i
      className="btn ri-add-circle-line add__icon text-end ri-lg p-0 "
      onClick={() => setIsAddModalOpen(true)}
    ></i>
  );

  let content;
  if (employee.loading) {
    content = (
      <div className="d-flex justify-content-center align-items-center">
        <img src="spinner.svg" alt="chargement" />
      </div>
    );
  } else if (employee.error) {
    content = (
      <p className="fw-bold fs-4 text-center">Une erreur est survenue...</p>
    );
  } else if (employee.data?.length === 0) {
    content = (
      <p className="fw-bold fs-4 text-center">Aucun employé actuellement</p>
    );
  } else if (employee.data?.length > 0) {
    content = (
      <table className="table styled-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Mail</th>
            <th scope="col">nom</th>
            <th scope="col">Modifier</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {employee.data?.map((employee) => (
            <tr key={employee.user_id}>
              <th scope="row">{`${employee.user_id.slice(0, 9)}...`}</th>
              <td data-label="Mail">{employee.user_email}</td>
              <td data-label="Nom de l'employee">{employee.user_name}</td>
              <td data-label="Modifier">
                {
                  <i
                    className="btn ri-edit-box-line edit__icon ri-lg p-0 "
                    onClick={() => handleModalOpen(employee)}
                  ></i>
                }
              </td>
              <td data-label="Supprimer">
                {
                  <i
                    className="btn ri-delete-bin-line delete__icon ri-lg p-0 "
                    onClick={() => handleDeleteEmployee(employee.user_id)}
                  ></i>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <Container>
      <div className="text-end me-4">{addIcon}</div>
      {content}

      {/*   //////////  MODALS   ////////// */}

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={handleModalClose}
        title="Modifier les informations de l'employé"
      >
        {selectedEmployee && (
          <EditEmployeeInfos
            employee={selectedEmployee}
            onSubmit={handleUpdateEmployee}
          />
        )}
      </CustomModal>

      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Créer un compte employé"
      >
        <Register onSubmit={handleAddEmployee} />
      </CustomModal>
    </Container>
  );
};

export default UsersAdmin;
