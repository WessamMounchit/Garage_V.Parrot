import React from "react";
import "../../styles/service-item.css";
import { Container } from "react-bootstrap";

const ServiceItem = ({ service }) => {
  const { title, description, image_path } = service;
  const correctedImagePath = image_path.replace(/\\/g, '/');
  console.log(correctedImagePath)

  return (
    <Container>
      <div
        className="service__item"
        style={{ backgroundImage: `url(${correctedImagePath})` }}
      >
        <div className="service-content">
          <div className="service-title">
            <h6>{title}</h6>
          </div>
          <p className="service-description mx-2">{description}</p>
        </div>
      </div>
    </Container>
  );
};

export default ServiceItem;
