import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CarItem from './CarItem'
import { onGetCars } from '../../api/cars';

const fetchCars = async (setCars) => {
  setCars({ loading: true, error: false, data: undefined });

  try {
    const response = await onGetCars();
    setCars({ loading: false, error: false, data: response.data });
  } catch (error) {
    setCars({ loading: false, error: true, data: undefined });
  }
};


const CarsSections = () => {

  const [cars, setCars] = useState({
    loading: false,
    error: false,
    data: undefined,
  });
  
  useEffect(() => {
    fetchCars(setCars);
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h6 className="section__subtitle">Découvrez</h6>
            <h2 className="section__title">Nos voitures</h2>
          </Col>

          {cars.data?.slice(0, 6).map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
        </Row>
      </Container>
    </section>

  )
}

export default CarsSections