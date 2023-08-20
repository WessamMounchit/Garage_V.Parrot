import React, { useEffect, useState } from 'react';
import './CarListing.css';
import { onDeleteCar, onGetCars } from '../api/cars';
import EditCar from './EditCar';
import AddCar from './AddCar';
import { toast } from 'react-toastify';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CarListing = () => {

  const [cars, setCars] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const { isAuth } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4; // Nombre d'éléments par page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;




  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    maxMileage: '',
  });

  useEffect(() => {
    setCars({ ...cars, loading: true });
    onGetCars()
      .then((response) => {
        setCars({ loading: false, error: false, data: response.data });
      })
      .catch((error) => {
        setCars({ loading: false, error: true, data: undefined });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshCars = () => {
    setCars({ ...cars, loading: true });
    onGetCars()
      .then((response) => {
        setCars({ loading: false, error: false, data: response.data });
        console.log(cars.loading)
      })
      .catch((error) => {
        setCars({ loading: false, error: true, data: undefined });
      });
  }

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
      refreshCars()
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCar = async () => {
    try {
      refreshCars()
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

    refreshCars()
  };

  const filteredCars = cars.data?.filter((car) => {
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
  console.log(filteredCars)
  const currentCars = filteredCars?.slice(indexOfFirstCar, indexOfLastCar);


  let content;
  if (cars.loading) content = <img src="spinner.svg" alt='chargement' />
  else if (cars.error) content = <p>Une erreur est survenue...</p>
  else if (cars.data?.length === 0) content = <p>Aucune voiture disponible</p>
  else if (cars.data?.length > 0) {
    content = currentCars?.map((car) => (
      <Col md={4} key={car.car_id} className="mb-4">
        <div className="card">
          <img src={car.image_path} className="card-img-top" alt={car.model} />
          <div className="card-body">
            <h5 className="card-title">{car.model}</h5>
            <p className="card-text">Prix : {car.price}€</p>
            <p className="card-text">Année : {car.year}</p>
            <p className="card-text">Kilométrage : {car.mileage}.km</p>
            {isAuth && <img src='Edit.svg' alt='Modifier une voiture' className="btn m-2" onClick={() => handleModalOpen(car)} />}
            {isAuth && <img src='Delete.svg' alt='Supprimer une voiture' className="btn m-2" onClick={() => { handleDeleteCar(car.car_id) }} />}
          </div>
        </div>
      </Col>
    ))
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCars?.length / carsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={`page-item${currentPage === number ? ' active' : ''}`}
      onClick={() => setCurrentPage(number)}
    >
      <button className="page-link">
        {number}
      </button>
    </li>
  ));



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
      {isAuth && <img src='Add.svg' alt='Ajouter une voiture' className="btn m-2" onClick={() => setIsAddModalOpen(true)} />}
      <Row>
        {content}
      </Row>

      <div className="pagination justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(1)}>
              &laquo;
            </button>
          </li>
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
              &lt;
            </button>
          </li>
          {renderPageNumbers}
          <li className={`page-item${currentPage === Math.ceil(filteredCars?.length / carsPerPage) ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
              &gt;
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(Math.ceil(filteredCars?.length / carsPerPage))}>
              &raquo;
            </button>
          </li>
        </ul>
      </div>

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
