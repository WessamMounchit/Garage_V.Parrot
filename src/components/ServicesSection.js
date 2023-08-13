import React, { useEffect, useState } from 'react';
import './ServicesSection.css';
import { onDeleteService, onGetServices } from '../api/services';
import { Modal, Carousel, Button } from 'react-bootstrap';
import AddService from './AddService';
import EditService from './EditService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function ServicesSection() {

  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { isAuth } = useSelector(state => state.auth)



  useEffect(() => {
    onGetServices()
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleModalOpen = (service) => {
    setSelectedService({ ...service });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedService(null);
    setIsUpdateModalOpen(false);
  };


  const handleAddService = async () => {
    try {
      onGetServices()
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      setIsAddModalOpen(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      onGetServices()
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCar = async (serviceId) => {
    try {
      const response = await onDeleteService(serviceId)
      toast.success(response.data.info)

    } catch (error) {
      toast.error(error.response.data.error)
    }

    onGetServices()
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
      <section id="services" className="py-5">
        <div className="container">
          {isAuth && <img src='Add.svg' alt='Ajouter' className="btn m-2" onClick={() => setIsAddModalOpen(true)} />}
          <Carousel data-bs-theme="dark">
            {services.map((service) => (
              <Carousel.Item key={service.service_id}>
                <div className="card mb-4">
                  <img
                    src={service.image_path}
                    className="card-img-top"
                    alt="Service 1"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{service.title}</h5>
                    <p className="card-text text-center">{service.description}</p>
                  </div>
                  <div className='flex justify-center'>
                    {isAuth && <img src='Edit.svg' alt='Modifier' className="btn m-2" width="55" height="55" onClick={() => handleModalOpen(service)} />}
                    {isAuth && <img src='Delete.svg' alt='Supprimer' className="btn m-2" width="55" height="55" onClick={() => { handleDeleteCar(service.service_id) }} />}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>
      <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddService onSubmit={handleAddService} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsAddModalOpen(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isUpdateModalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && <EditService service={selectedService} onSubmit={handleUpdateCar} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ServicesSection;
