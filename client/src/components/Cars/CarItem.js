import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Cars/car-item.css";

const CarItem = ({ car }) => {
  const { car_id, car_name, price, year, mileage, image_path, automatic } = car;

  return (
    <Col xxl="4" xl="4" lg="6" md="6" className="mb-5 card__container">
      <div className="car__item">
        <div className="car__img">
          <img src={image_path} alt="" className="" />
        </div>

        <div className="car__item-content">
          <h4 className="car__name text-center">{car_name}</h4>
          <h6 className="rent__price text-center mt-">
            {price.toLocaleString()} <span>€</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-fill"></i> Modèle-{year}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-fill"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-dashboard-3-fill"></i>{" "}
              {mileage.toLocaleString("")} <span>km</span>
            </span>
          </div>

          <Link to={`/${car_name}/${car_id}`} className="text-decoration-none ">
            <button className="w-100 custom__btn">Details</button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
