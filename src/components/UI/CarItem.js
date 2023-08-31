import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useSelector } from "react-redux";

const CarItem = ({ car, handleModalOpen, handleDeleteCar }) => {
  const { isAuth } = useSelector((state) => state.auth);

  const {
    car_id,
    car_name,
    price,
    year,
    mileage,
    image_path,
    automatic
  } = car;


  const editIcon = isAuth && (
    <i
      type="button"
      variant="warning"
      className="ri-edit-box-fill edit__icon ri-lg my-2"
      onClick={() => handleModalOpen()}>
    </i>
  )

  const deleteIcon = isAuth && (
    <i
      type="button"
      variant="warning"
      className="ri-delete-bin-fill delete__icon ri-lg my-2"
      onClick={() => handleDeleteCar()}>
    </i>
  )

  return (
    <Col xxl="4" xl="4" lg="6" md="6" className="mb-5 card__container">
      <div className="car__item">
        <span className="text-end">{editIcon} {deleteIcon}</span>
        <div className="car__img">
          <img src={image_path} alt="" className="" />
        </div>

        <div className="car__item-content">
          <h4 className="section__title text-center">{car_name}</h4>
          <h6 className="rent__price text-center mt-">
            {price.toLocaleString()} <span>€</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-fill"></i> Modèle-{year}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-fill"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-dashboard-3-fill"></i> {mileage.toLocaleString("")} <span>km</span>
            </span>
          </div>

          <button className=" w-100 car__item-btn car__btn-details">
            <Link to={`/car/${car_id}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
