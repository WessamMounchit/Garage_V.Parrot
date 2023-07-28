import React, { useEffect, useState } from 'react';
import './ServicesSection.css'; // Import du fichier CSS
import { onGetServices } from '../api/services';
import Modal from 'react-modal';
import AddService from './AddService';
import EditService from './EditService';

function ServicesSection() {

  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);



  useEffect(() => {
    onGetServices()
      .then((response) => {
        setServices(response.data);
        console.log(services)
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


  return (
    <>
      <button className="btn btn-success m-2" onClick={() => setIsAddModalOpen(true)}>Ajouter un service</button>
      <section id="services" className="py-5">
        <div className="container">
          <div className="row">
            {services.map((service) => (
              <div key={service.service_id} className="col-md-4">
                <div className="card mb-4">
                  <img
                    src={service.image_path}
                    className="card-img-top"
                    alt="Service 1"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  </div>
                  <button className="btn btn-warning m-2" onClick={() => handleModalOpen(service)}>Modifier</button>
                </div>
              </div>
            ))}

            {/*           <div className="col-md-4">
            <div className="card mb-4">
              <img
                src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="card-img-top"
                alt="Service 1"
              />
              <div className="card-body">
                <h5 className="card-title">Réparation automobile</h5>
                <p className="card-text">
                  Nous offrons une large gamme de services de réparation automobile pour tous types de véhicules.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img
                src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="card-img-top"
                alt="Service 1"
              />
              <div className="card-body">
                <h5 className="card-title">Réparation automobile</h5>
                <p className="card-text">
                  Nous offrons une large gamme de services de réparation automobile pour tous types de véhicules.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img
                src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className="card-img-top"
                alt="Service 2"
              />
              <div className="card-body">
                <h5 className="card-title">Entretien préventif</h5>
                <p className="card-text">
                  Notre équipe expérimentée propose des services d'entretien préventif pour garder votre véhicule en bon état.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img
                src="https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className="card-img-top"
                alt="Service 3"
              />
              <div className="card-body">
                <h5 className="card-title">Diagnostic avancé</h5>
                <p className="card-text">
                  Nous utilisons des outils de diagnostic de pointe pour identifier rapidement les problèmes de votre véhicule.
                </p>
              </div>
            </div>
          </div>
 */}        </div>
        </div>
      </section>

      <Modal isOpen={isAddModalOpen} onRequestClose={() => setIsAddModalOpen(false)}>
        <h2>Ajouter un service</h2>
        <AddService onSubmit={handleAddService} />
        <button className="btn btn-danger m-2" onClick={() => setIsAddModalOpen(false)}>Fermer</button>
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onRequestClose={handleModalClose}>
        <h2>Modifier la voiture</h2>
        {selectedService && <EditService service={selectedService} onSubmit={handleUpdateCar} />}
        <button className="btn btn-danger m-2" onClick={handleModalClose}>Fermer</button>
      </Modal>

    </>
  );
}

export default ServicesSection;
