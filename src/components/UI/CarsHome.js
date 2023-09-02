import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import CarItem from './CarItem';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestCars } from '../../redux/slices/carSlice';

const CarsHome = () => {
  const cars = useSelector((state => state.cars))
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchLatestCars())
  }, [dispatch]);

  let content;
  if (cars.loading) {
    content = <img src="spinner.svg" alt='chargement' />
  }
  else if (cars.error) {
    content = <p>Une erreur est survenue...</p>
  }
  else if (cars.data?.length === 0) {
    content = <p>Aucune voiture disponible</p>
  }
  else if (cars.data?.length > 0) {
    content = cars.data?.map((car) => (
      <CarItem
        car={car}
        key={car.car_id}
      />
    ))
  }


  return (
    <Container className='mt-5 d-flex align-items-center flex-column'>
      <Row>
        <Col lg="12" className="text-center mb-5">
          <h6 className="section__subtitle">Découvrez Nos</h6>
          <h2 className="section__title">Dernières voitures</h2>
        </Col>

        {content}
        
      </Row>

      <button className="text-center w-50 car__item-btn car__btn-details">
        <Link to={`/cars`}>Voir toutes nos voitures</Link>
      </button>
    </Container>
  )
}

export default CarsHome