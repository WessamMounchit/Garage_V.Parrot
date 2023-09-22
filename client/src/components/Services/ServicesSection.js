import React, { useEffect, useState } from 'react'
import fetchData from '../../utils/fetchData';
import { onGetServices } from '../../api/services';
import { Col, Container, Row } from 'react-bootstrap';
import ServiceItem from "./ServiceItem";
import Carousel from 'react-multi-carousel';

const ServicesSection = () => {
  const [services, setServices] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  useEffect(() => {
    fetchData(setServices, onGetServices);
  }, []);


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  let content;
  if (services.loading) {
    content = <img src="spinner.svg" alt='chargement' />
  }
  else if (services.error) {
    content = <p className="fw-bold fs-4 text-center">Une erreur est survenue...</p>
  }
  else if (services.data?.length === 0) {
    content = <p className="fw-bold fs-4 text-center">Aucun service n'est disponible pour le moment</p>
  }
  else if (services.data?.length > 0) {
    content = services.data && services.data.length > 0 && (
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
        {services.data?.map((service) => (
          <ServiceItem
            service={service}
            key={service.service_id}
          />
        ))}
      </Carousel >
    )
  }


  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-4 text-center">
          <h6 className="section__subtitle">Découvrez</h6>
          <h2 className="section__title">Nos services</h2>
        </Col>
      </Row>

      {content}
    </Container >
  )
}

export default ServicesSection