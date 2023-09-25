import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import fetchData from "../../../utils/fetchData";
import { deleteService, getServices } from "../../../api/services";
import { toast } from "react-toastify";
import CustomModal from "../../UI/CustomModal";
import AddService from "./AddService";
import EditService from "./EditService";
import ServiceItem from "../../Services/ServiceItem";

const ServicesAdmin = () => {
  //////////  STATE   //////////

  const [services, setServices] = useState({
    loading: false,
    error: false,
    data: undefined,
  });
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchData(setServices, getServices);
  }, []);

  //////////  HANDLE MODALS   //////////

  const handleViewModalOpen = (service) => {
    setSelectedService({ ...service });
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setSelectedService(null);
    setIsViewModalOpen(false);
  };

  const handleModalOpen = (service) => {
    setSelectedService({ ...service });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedService(null);
    setIsUpdateModalOpen(false);
  };

  //////////  API   //////////

  const handleAddService = async () => {
    try {
      fetchData(setServices, getServices);

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateService = async () => {
    try {
      fetchData(setServices, getServices);
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await deleteService(serviceId);
      toast.success(response.data.info);
    } catch (error) {
      toast.error(error.response.data.error);
    }
    fetchData(setServices, getServices);
  };

  const addIcon = (
    <i
      className="btn ri-add-circle-line add__icon text-end ri-lg p-0 "
      onClick={() => setIsAddModalOpen(true)}
    ></i>
  );

  let content;
  if (services.loading) {
    content = (
      <div className="d-flex justify-content-center align-items-center">
        <img src="spinner.svg" alt="chargement" />
      </div>
    );
  } else if (services.error) {
    content = (
      <p className="fw-bold fs-4 text-center">Une erreur est survenue...</p>
    );
  } else if (services.data?.length === 0) {
    content = (
      <p className="fw-bold fs-4 text-center">
        Aucun service disponible pour le moment
      </p>
    );
  } else if (services.data?.length > 0) {
    const sortedServices = [...services.data].sort(
      (a, b) => a.service_id - b.service_id
    );

    content = (
      <table className="table styled-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nom du service</th>
            <th scope="col">Modifier</th>
            <th scope="col">Supprimer</th>
            <th scope="col">Détails</th>
          </tr>
        </thead>
        <tbody>
          {sortedServices?.map((service) => (
            <tr key={service.service_id}>
              <th scope="row">{service.service_id}</th>
              <td data-label="Nom du service">{service.title}</td>
              <td data-label="Modifier">
                {
                  <i
                    className="btn ri-edit-box-line edit__icon ri-lg p-0 "
                    onClick={() => handleModalOpen(service)}
                  ></i>
                }
              </td>
              <td data-label="Supprimer">
                {
                  <i
                    className="btn ri-delete-bin-line delete__icon ri-lg p-0 "
                    onClick={() => handleDeleteService(service.service_id)}
                  ></i>
                }
              </td>
              <td data-label="Détails">
                <i
                  onClick={() => handleViewModalOpen(service)}
                  className="btn ri-eye-line ri-lg eye__icon p-0"
                />
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
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        title="Visualisation"
      >
        {selectedService && <ServiceItem service={selectedService} />}
      </CustomModal>

      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un service"
      >
        <AddService onSubmit={handleAddService} />
      </CustomModal>

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={handleModalClose}
        title="Modifier une voiture"
      >
        {selectedService && (
          <EditService
            service={selectedService}
            onSubmit={handleUpdateService}
          />
        )}
      </CustomModal>
    </Container>
  );
};

export default ServicesAdmin;
