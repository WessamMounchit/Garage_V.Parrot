import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = ({ item }) => {
  const {
    brand,
    car_name,
    fuel_type,
    price,
    year,
    mileage,
    image_path,
    gallery,
    seat,
    doors,
    automatic,
    description
  } = item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
      <i class="my-2 edit__icon ri-lg ri-edit-box-fill"></i>
        <div className="car__img">
          <img src={image_path} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{car_name}</h4>
          <h6 className="rent__price text-center mt-">
            {price}.00 <span>€</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> Modèle-{year}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {mileage} <span>km</span>
            </span>
          </div>

          <button className=" w-100 car__item-btn car__btn-details">
            <Link to={`/cars/${car_name}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
