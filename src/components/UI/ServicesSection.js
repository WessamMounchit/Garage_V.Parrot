import React, { useEffect, useState } from 'react'
import fetchData from '../../utils/fetchData';
import { onGetServices } from '../../api/services';
import { Col, Container, Row } from 'react-bootstrap';
import ServiceItem from "./ServiceItem";
import Slider from 'react-slick';

const ServicesSection = () => {
  const [services, setServices] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  useEffect(() => {
    fetchData(setServices, onGetServices);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
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


  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-4 text-center">
          <h6 className="section__subtitle">Découvrez</h6>
          <h2 className="section__title">Nos services</h2>
        </Col>
      </Row>

      <Slider {...settings} className="hero__slider">
            {services.data?.map((service) => (
              <ServiceItem
                service={service}
                key={service.service_id}
              />
            ))}
      </Slider >
    </Container >
  )
}

export default ServicesSection