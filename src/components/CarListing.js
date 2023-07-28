import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './CarListing.css';
import { onDeleteCar, onGetCars } from '../api/cars';
import EditCar from './EditCar';
import AddCar from './AddCar';
import { toast } from 'react-toastify';

const CarListing = () => {

  const [cars, setCars] = useState([]);

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
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Prix min"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Prix max"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="minYear"
            value={filters.minYear}
            onChange={handleFilterChange}
            placeholder="Année min"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="maxYear"
            value={filters.maxYear}
            onChange={handleFilterChange}
            placeholder="Année max"
            className="form-control"
          />
        </div>
        <div className="col-md-3 mt-3">
          <input
            type="number"
            name="maxMileage"
            value={filters.maxMileage}
            onChange={handleFilterChange}
            placeholder="Kilométrage max"
            className="form-control"
          />
        </div>
      </div>
      <button className="btn btn-success m-2" onClick={() => setIsAddModalOpen(true)}>Ajouter une voiture</button>
      <div className="row">
        {filteredCars.map((car) => (
          <div key={car.car_id} className="col-md-4 mb-4">
            <div className="card">
              <img src={car.image_path} className="card-img-top" alt={car.model} />
              <div className="card-body">
                <h5 className="card-title">{car.model}</h5>
                <p className="card-text">Prix : {car.price}€</p>
                <p className="card-text">Année : {car.year}</p>
                <p className="card-text">Kilométrage : {car.mileage}.km</p>
                <button className="btn btn-warning m-2" onClick={() => handleModalOpen(car)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => {handleDeleteCar(car.car_id)}}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isUpdateModalOpen} onRequestClose={handleModalClose}>
        <h2>Modifier la voiture</h2>
        {selectedCar && <EditCar car={selectedCar} onSubmit={handleUpdateCar} />}
        <button className="btn btn-danger m-2" onClick={handleModalClose}>Fermer</button>
      </Modal>

      <Modal isOpen={isAddModalOpen} onRequestClose={() => setIsAddModalOpen(false)}>
        <h2>Ajouter une voiture</h2>
        <AddCar onSubmit={handleAddCar} />
        <button className="btn btn-danger m-2" onClick={() => setIsAddModalOpen(false)}>Fermer</button>
      </Modal>
    </div>
  );
};
export default CarListing;
