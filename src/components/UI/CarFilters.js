import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const CarFilters = ({ filters, handleFilterChange }) => {
  return (
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
  );
};

export default CarFilters;
