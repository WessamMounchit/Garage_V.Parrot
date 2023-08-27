import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onGetSelectedCar } from '../api/cars';
import Layout from '../components/Layout';
import { Carousel } from 'react-bootstrap';

const CarDetails = () => {
  const { carId } = useParams();

  const [car, setCar] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  useEffect(() => {
    setCar({ ...car, loading: true });
    onGetSelectedCar(carId)
      .then((response) => {
        setCar({ loading: false, error: false, data: response.data });
      })
      .catch((error) => {
        setCar({ loading: false, error: true, data: undefined });
      });
  }, []);

  const renderFeatures = () => {
    if (!car.data || !car.data.features) {
      return null;
    }

    return (
      <ul className="list-disc mt-4">
        {car.data.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    );
  };

  return (
    <Layout>
      {car.data && (
        <div className="container mt-5">
          <h1 className="display-4 fw-bold mb-4">{car.data.model}</h1>
          <Carousel>
            {car.data.gallery.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  className="d-block w-100"
                  alt={`Gallery ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <h2 className="mt-4">Caractéristiques</h2>
          <ul className="list-unstyled">
            <li>Année : {car.data.year}</li>
            <li>Kilométrage : {car.data.mileage} km</li>
            <li>Prix : {car.data.price} €</li>
            {/* Ajoutez d'autres caractéristiques ici */}
          </ul>
          <h2 className="mt-4">Équipements</h2>
          <ul className="list-unstyled">
            {car.data.equipment.map((equip, index) => (
              <li key={index}>{equip}</li>
            ))}
          </ul>
          <h2 className="mt-4">Features</h2>
          {renderFeatures()}
        </div>
      )}
    </Layout>
  );
};

export default CarDetails;
