import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import fetchData from "../../utils/fetchData";
import { onGetTestimonials } from "../../api/testimonials";
import { Col, Container, Row } from "react-bootstrap";
import TestimonialItem from "./TestimonialItem";
import CustomModal from "./CustomModal";
import AddTestimonial from "../AddTestimonial";

const Testimonial = () => {

  const [testimonials, setTestimonials] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchData(setTestimonials, onGetTestimonials);
  }, []);

  
  const handleAddTestimonial = async () => {
    try {
      fetchData(setTestimonials, onGetTestimonials);

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
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


  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4 text-center">
            <h6 className="section__subtitle">Nos clients donnent leurs</h6>
            <h2 className="section__title">Avis</h2>
          </Col>

          <Slider {...settings} className="testimonial">
            {testimonials.data
              ?.filter((testimonial) => testimonial.validated === true)
              .map((testimonial) => (
                <TestimonialItem
                  testimonial={testimonial}
                  key={testimonial.testimonial_id}
                />
              ))}
          </Slider>
        </Row>
        <button onClick={() => setIsAddModalOpen(true)} className="custom__btn mt-4 ms-auto me-4">Laissez un avis</button>
      </Container>

      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title='Ajouter un avis'
      >
        <AddTestimonial onSubmit={handleAddTestimonial} />
      </CustomModal>

    </section>
  );
};

export default Testimonial;
