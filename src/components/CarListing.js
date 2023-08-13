import React, { useEffect, useState } from 'react';
import './CarListing.css';
import { onDeleteCar, onGetCars } from '../api/cars';
import EditCar from './EditCar';
import AddCar from './AddCar';
import { toast } from 'react-toastify';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CarListing = () => {

  const [cars, setCars] = useState([]);
  const { isAuth } = useSelector((state) => state.auth);


  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    maxMileage: '',
  });

  useEffect(() => {
    onGetCars()
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleModalOpen = (car) => {
    setSelectedCar({ ...car });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCar(null);
    setIsUpdateModalOpen(false);
  };

   const handleUpdateCar = async () => {
    try {
      onGetCars()
        .then((response) => {
          setCars(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

   const handleAddCar = async () => {
    try {
      onGetCars()
        .then((response) => {
          setCars(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      
      setIsAddModalOpen(false)
    } catch (error) {
      console.error(error);
    }
  };

   const handleDeleteCar = async (carId) => {
      try {
        const response = await onDeleteCar(carId)
        toast.success(response.data.info)

      } catch (error) {
        toast.error(error.response.data.error)
      }

      onGetCars()
        .then((response) => {
          setCars(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };
 
  const filteredCars = cars.filter((car) => {
    const price = parseFloat(car.price.replace(',', ''));
    const year = parseInt(car.year);
    const mileage = parseInt(car.mileage.replace(' km', '').replace(',', ''));

    return (
      (filters.minPrice === '' || price >= parseFloat(filters.minPrice)) &&
      (filters.maxPrice === '' || price <= parseFloat(filters.maxPrice)) &&
      (filters.minYear === '' || year >= parseInt(filters.minYear)) &&
      (filters.maxYear === '' || year <= parseInt(filters.maxYear)) &&
      (filters.maxMileage === '' || mileage <= parseInt(filters.maxMileage))
    );
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Liste des véhicules d'occasion</h2>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Prix min"
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Prix max"
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            name="minYear"
            value={filters.minYear}
            onChange={handleFilterChange}
            placeholder="Année min"
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            name="maxYear"
            value={filters.maxYear}
            onChange={handleFilterChange}
            placeholder="Année max"
          />
        </Col>
        <Col md={3} className="mt-3">
          <Form.Control
            type="number"
            name="maxMileage"
            value={filters.maxMileage}
            onChange={handleFilterChange}
            placeholder="Kilométrage max"
          />
        </Col>
      </Row>
      { isAuth && <img src='Add.svg' alt='Ajouter une voiture' className="btn m-2" onClick={() => setIsAddModalOpen(true)} />}
      <Row>
        {filteredCars.map((car) => (
          <Col md={4} key={car.car_id} className="mb-4">
            <div className="card">
              <img src={car.image_path} className="card-img-top" alt={car.model} />
              <div className="card-body">
                <h5 className="card-title">{car.model}</h5>
                <p className="card-text">Prix : {car.price}€</p>
                <p className="card-text">Année : {car.year}</p>
                <p className="card-text">Kilométrage : {car.mileage}.km</p>
                { isAuth && <img src='Edit.svg' alt='Modifier une voiture' className="btn m-2" onClick={() => handleModalOpen(car)} />}
                { isAuth && <img src='Delete.svg' alt='Supprimer une voiture' className="btn m-2" onClick={() => { handleDeleteCar(car.car_id) }} />}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={isUpdateModalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la voiture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCar && <EditCar car={selectedCar} onSubmit={handleUpdateCar} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une voiture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCar onSubmit={handleAddCar} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsAddModalOpen(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
};
export default CarListing;
