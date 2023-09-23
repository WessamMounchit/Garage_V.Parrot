import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onGetSelectedCar } from "../api/cars";
import { Col, Container, Row } from "react-bootstrap";
import FormContact from "../components/UI/FormContact";
import "../styles/Cars/car-details.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/UI/Helmet";

const CarDetails = () => {
  const { carId } = useParams();

  const [car, setCar] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  useEffect(() => {
    setCar((car) => ({ ...car, loading: true }));
    onGetSelectedCar(carId)
      .then((response) => {
        setCar(() => ({ loading: false, error: false, data: response.data }));
      })
      .catch((error) => {
        setCar(() => ({ loading: false, error: true, data: undefined }));
      });
  }, [carId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [car]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const images = car.data ? [car.data.image_path, ...car.data.gallery] : [];

  return (
    <Helmet title="Plus d'infos">
      <CommonSection title="Plus d'infos" />

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <Carousel
                responsive={responsive}
                swipeable={true}
                arrows={false}
                draggable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                transitionDuration={500}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-center  align-items-center "
                  >
                    <img src={image} alt="" className="img__gallery" />
                  </div>
                ))}
              </Carousel>
            </Col>

            <Col lg="6">
              <div className="car__info h-100 d-flex flex-column justify-content-center ">
                <h2 className="section__title">{car.data?.car_name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {car.data?.price.toLocaleString()} €
                  </h6>
                </div>

                <p className="section__description">{car.data?.description}</p>
              </div>

              <div className="icons__container">
                <div className="icons__group">
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-roadster-line icons__details" />
                    {car.data?.year}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-settings-2-line icons__details" />
                    {car.data?.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-timer-2-line icons__details" />
                    {car.data?.mileage.toLocaleString()} km
                  </span>
                </div>

                <div className="icons__group">
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-door-line icons__details" />
                    {car.data?.doors}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-building-2-line icons__details" />
                    {car.data?.brand}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-wheelchair-line icons__details" />
                    {car.data?.seat}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="12" className="contact__details">
              <div className="booking-info mt-5">
                {car.data?.car_name && (
                  <FormContact carName={car.data.car_name} />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
