import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import fetchData from "../../utils/fetchData";
import { onDeleteTestimonial, onGetTestimonials } from "../../api/testimonials";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import CustomModal from "./CustomModal";
import AddTestimonial from "../AddTestimonial";
import EditTestimonial from "../EditTestimonial";
import TestimonialItem from "./TestimonialItem";

const Testimonial = () => {

  const [testimonials, setTestimonials] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchData(setTestimonials, onGetTestimonials);
  }, []);

  const handleModalOpen = (testimonial) => {
    setSelectedTestimonial({ ...testimonial });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTestimonial(null);
    setIsUpdateModalOpen(false);
  };

  const handleAddTestimonial = async () => {
    try {
      fetchData(setTestimonials, onGetTestimonials);

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTestimonial = async () => {
    try {
      fetchData(setTestimonials, onGetTestimonials);

      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      const response = await onDeleteTestimonial(testimonialId);
      toast.success(response.data.info);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setTestimonials, onGetTestimonials);
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

  const addIcon = isAuth && (
    <i
      className="btn ri-add-box-fill add__icon text-end ri-lg mb-4 p-0 "
      onClick={() => setIsAddModalOpen(true)}>
    </i>
  )


  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4 text-center">
            <h6 className="section__subtitle">Nos clients donnent leurs</h6>
            <h2 className="section__title">Avis</h2>
          </Col>

          <span className='text-end'>{addIcon}</span>
          <Slider {...settings} className="testimonial">
            {testimonials.data
              ?.filter((testimonial) => testimonial.validated === true)
              .map((testimonial) => (
                <TestimonialItem
                  testimonial={testimonial}
                  key={testimonial.testimonial_id}
                  handleModalOpen={() => handleModalOpen(testimonial)}
                  handleDeleteCar={() => {
                    handleDeleteTestimonial(testimonial.testimonial_id);
                  }}
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

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={handleModalClose}
        title='Modifier un avis'
      >
        {selectedTestimonial &&
          <EditTestimonial
            testimonial={selectedTestimonial}
            onSubmit={handleUpdateTestimonial}
          />}
      </CustomModal>


    </section>
  );
};

export default Testimonial;
