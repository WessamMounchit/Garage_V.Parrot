  import React, { useState } from 'react';
  import Modal from 'react-modal';
  import './CarListing.css';
  import CarForm from './CarForm';

  const carList = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      price: '12,000€',
      year: '2018',
      mileage: '50,000 km',
      image: 'toyota_corolla.jpg',
      gallery: ['image1.jpg', 'image2.jpg'],
      features: ['Airbags', 'Climatisation', 'Régulateur de vitesse'],
      equipment: ['Toit ouvrant', 'GPS', 'Bluetooth'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut turpis in tellus interdum malesuada.'
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla',
      price: '12,000€',
      year: '2018',
      mileage: '50,000 km',
      image: 'toyota_corolla.jpg',
      gallery: ['image1.jpg', 'image2.jpg'],
      features: ['Airbags', 'Climatisation', 'Régulateur de vitesse'],
      equipment: ['Toit ouvrant', 'GPS', 'Bluetooth'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut turpis in tellus interdum malesuada.'
    },
    {
      id: 3,
      brand: 'Toyota',
      model: 'Corolla',
      price: '12,000€',
      year: '2018',
      mileage: '50,000 km',
      image: 'toyota_corolla.jpg',
      gallery: ['image1.jpg', 'image2.jpg'],
      features: ['Airbags', 'Climatisation', 'Régulateur de vitesse'],
      equipment: ['Toit ouvrant', 'GPS', 'Bluetooth'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut turpis in tellus interdum malesuada.'
    },
    {
      id: 4,
      brand: 'Toyota',
      model: 'Corolla',
      price: '12,000€',
      year: '2018',
      mileage: '50,000 km',
      image: 'toyota_corolla.jpg',
      gallery: ['image1.jpg', 'image2.jpg'],
      features: ['Airbags', 'Climatisation', 'Régulateur de vitesse'],
      equipment: ['Toit ouvrant', 'GPS', 'Bluetooth'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut turpis in tellus interdum malesuada.'
    },
    {
      id: 5,
      brand: 'Toyota',
      model: 'Corolla',
      price: '12,000€',
      year: '2018',
      mileage: '50,000 km',
      image: 'toyota_corolla.jpg',
      gallery: ['image1.jpg', 'image2.jpg'],
      features: ['Airbags', 'Climatisation', 'Régulateur de vitesse'],
      equipment: ['Toit ouvrant', 'GPS', 'Bluetooth'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut turpis in tellus interdum malesuada.'
    },
  ];

  const CarListing = () => {

    const [filters, setFilters] = useState({
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      maxMileage: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    const handleAddCar = (newCar) => {
      handleModalClose();
    };
    
    const filteredCars = carList.filter((car) => {
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

        <div className="row">
          {filteredCars.map((car) => (
            <div key={car.id} className="col-md-4 mb-4">
              <div className="card">
                <img src='https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg?auto=compress&cs=tinysrgb&w=600' className="card-img-top" alt={car.model} />
                <div className="card-body">
                  <h5 className="card-title">{car.model}</h5>
                  <p className="card-text">Prix : {car.price}</p>
                  <p className="card-text">Année : {car.year}</p>
                  <p className="card-text">Kilométrage : {car.mileage}</p>
{/*                   <button className="btn btn-warning m-2" onClick={handleModalOpen}>Modifier</button>
 */}                  <button className="btn btn-success">En savoir plus</button>
                </div>
              </div>
            </div>
          ))}
        </div>

{/*         <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
          <h2>Modifier la voiture</h2>
          <CarForm onAddCar={handleAddCar} />
          <button onClick={handleModalClose}>Fermer</button>
        </Modal>
 */}      </div>
    );
  };
  export default CarListing;
