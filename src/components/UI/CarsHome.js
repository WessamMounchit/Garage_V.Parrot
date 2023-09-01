import React, { useEffect, useState } from 'react'
import fetchData from '../../utils/fetchData';
import { onGetLatestCars } from '../../api/cars';
import { Col, Container, Row } from 'react-bootstrap';
import CarItem from './CarItem';
import { Link } from 'react-router-dom';

const CarsHome = () => {
  const [cars, setCars] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  useEffect(() => {
    fetchData(setCars, onGetLatestCars);
  }, []);


  return (
    <Container className='mt-5 d-flex align-items-center flex-column'>
      <Row>
        <Col lg="12" className="text-center mb-5">
          <h6 className="section__subtitle">Découvrez Nos</h6>
          <h2 className="section__title">Dernières voitures</h2>
        </Col>

        {cars.data?.map((car) => (
          <CarItem
            car={car}
            key={car.car_id}
          />
        ))}
      </Row>

      <button className="text-center w-50 car__item-btn car__btn-details">
        <Link to={`/cars`}>Voir toutes nos voitures</Link>
      </button>
    </Container>
  )
}

export default CarsHome