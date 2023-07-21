import React, { useState } from 'react';
import CarForm from './CarForm';
import CarListing from './CarListing';

const CarManagement = () => {
  const [cars, setCars] = useState([]);

  const handleAddCar = (newCar) => {
    setCars([...cars, newCar]);
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gestion des voitures</h2>
      <CarListing cars={cars} />
      <CarForm onAddCar={handleAddCar} />
    </div>
  );
};

export default CarManagement;
