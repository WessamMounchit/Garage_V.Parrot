import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onGetSelectedCar } from '../api/cars';
import { Col, Container, Row } from 'react-bootstrap';
import FormContact from '../components/UI/FormContact';
import Slider from 'react-slick';
import '../styles/car-details.css'

const CarDetails = () => {
  const { carId } = useParams();

  const [car, setCar] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  useEffect(() => {
    setCar(car => ({ ...car, loading: true }));
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


  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = car.data
    ? [car.data.image_path, ...car.data.gallery]
    : [];

  return (
    <section>
      <Container>
        <Row>
          <Col lg="6">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div className='d-flex justify-content-center  align-items-center '>
                  <img key={index} src={image} alt="" className="img__gallery" />
                </div>
              ))}
            </Slider>
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
              {car.data?.car_name && <FormContact carName={car.data.car_name} />}
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default CarDetails;
