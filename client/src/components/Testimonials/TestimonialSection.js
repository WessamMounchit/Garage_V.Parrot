import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { getTestimonials } from "../../api/testimonials";
import { Col, Container, Row } from "react-bootstrap";
import TestimonialItem from "./TestimonialItem";
import CustomModal from "../UI/CustomModal";
import AddTestimonial from "../Administration/Testimonials/AddTestimonial";
import Carousel from "react-multi-carousel";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState({
    loading: false,
    error: false,
    data: undefined,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchData(setTestimonials, getTestimonials);
  }, []);

  const handleAddTestimonial = async () => {
    try {
      fetchData(setTestimonials, getTestimonials);

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  let content;
  if (testimonials.loading) {
    content = (
      <div className="d-flex justify-content-center align-items-center">
        <img src="spinner.svg" alt="chargement" />
      </div>
    );
  } else if (testimonials.error) {
    content = (
      <p className="fw-bold fs-4 text-center">Une erreur est survenue...</p>
    );
  } else if (testimonials.data?.length === 0) {
    content = (
      <p className="fw-bold fs-4 text-center">Aucune voiture disponible</p>
    );
  } else if (testimonials.data?.length > 0) {
    content = testimonials.data && testimonials.data.length > 0 && (
      <Carousel
        responsive={responsive}
        swipeable={true}
        arrows={false}
        draggable={true}
        showDots={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        transitionDuration={500}
      >
        {testimonials.data
          .filter((testimonial) => testimonial.validated === true)
          .map((testimonial) => (
            <TestimonialItem
              testimonial={testimonial}
              key={testimonial.testimonial_id}
            />
          ))}
      </Carousel>
    );
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4 text-center">
            <h6 className="section__subtitle">Nos clients donnent leurs</h6>
            <h2 className="section__title">Avis</h2>
          </Col>

          {content}
        </Row>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="custom__btn mt-4 ms-auto me-4"
        >
          Laissez un avis
        </button>
      </Container>

      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un avis"
      >
        <AddTestimonial onSubmit={handleAddTestimonial} />
      </CustomModal>
    </section>
  );
};

export default Testimonial;
