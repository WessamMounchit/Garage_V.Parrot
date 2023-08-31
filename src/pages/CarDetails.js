import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onGetSelectedCar } from '../api/cars';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import FormContact from '../components/UI/FormContact';

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

  return (
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={car.data?.image_path} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info h-100 d-flex flex-column justify-content-center ">
                <h2 className="section__title">{car.data?.car_name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {car.data?.price.toLocaleString()} € 
                  </h6>
                </div>

                <p className="section__description">
                  {car.data?.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.data?.year}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.data?.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.data?.mileage.toLocaleString()} km
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "6.5rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {car.data?.doors}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.data?.brand}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {car.data?.seat}
                  </span>

                </div>
              </div>
            </Col>

             <Col lg="12">
              <div className="booking-info mt-5">
{/*                 <h5 className="mb-4 fw-bold text-center">Formulaire de contact</h5>
 */}                {car.data?.car_name && <FormContact carName={car.data.car_name} />}
              </div>
            </Col>

{/*             <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
 */}           </Row>
        </Container>
      </section>
  );
};

export default CarDetails;
