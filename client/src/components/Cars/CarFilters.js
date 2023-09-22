import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import '../../styles/slider.css'
import ReactSlider from 'react-slider';

const CarFilters = ({ filters, setFilters }) => {

  const handlePriceRangeChange = (value) => {
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleYearRangeChange = (value) => {
    setFilters({
      ...filters,
      minYear: value[0],
      maxYear: value[1],
    });
  };

  const handleMileageRangeChange = (value) => {
    setFilters({
      ...filters,
      minMileage: value[0],
      maxMileage: value[1],
    });
  };

  return (
    <Row className="slider__container">
      <Col md={3}>
        <Form.Group className="mb-3" controlId="brand">
          <div className='slider__label'>Prix : {filters.minPrice.toLocaleString()} € - {filters.maxPrice.toLocaleString()} €</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={[filters.minPrice, filters.maxPrice]}
            onChange={(value) => handlePriceRangeChange(value)}
            min={0}
            max={100000}
          />
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group className="mb-3" controlId="brand">
          <div className='slider__label'>Année : {filters.minYear} - {filters.maxYear}</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={[filters.minYear, filters.maxYear]}
            onChange={(value) => handleYearRangeChange(value)}
            min={2000}
            max={2023}
          />
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group className="mb-3" controlId="brand">
          <div className='slider__label'>Kilométrage : {filters.minMileage.toLocaleString()} km - {filters.maxMileage.toLocaleString()} km</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={[filters.minMileage, filters.maxMileage]}
            onChange={(value) => handleMileageRangeChange(value)}
            min={0}
            max={100000}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default CarFilters;
