import React, { useEffect, useState } from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';
import './Testimonial.css';
import { onDeleteTestimonial, onGetTestimonials } from '../api/testimonials';
import AddTestimonial from './AddTestimonial';
import EditTestimonial from './EditTestimonial';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Testimonial = () => {

  const [testimonials, setTestimonials] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const { isAuth } = useSelector((state) => state.auth);


  useEffect(() => {
    onGetTestimonials()
      .then((response) => {
        setTestimonials(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      onGetTestimonials()
        .then((response) => {
          setTestimonials(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTestimonial = async () => {
    try {
      onGetTestimonials()
        .then((response) => {
          setTestimonials(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

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

    onGetTestimonials()
      .then((response) => {
        setTestimonials(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isAuth && <img src='Add.svg' alt='Ajouter un avis' className="btn m-2" onClick={() => setIsAddModalOpen(true)} />}
      <div className="container mt-5 mb-5">
        <Carousel>
          {testimonials.map((testimonial) => (
            <Carousel.Item key={testimonial.testimonial_id}>
              <div className="testimonial-card text-center">
                <img src={testimonial.image_path} className="rounded-circle" width="80" alt="avatar" />
                <h5 className="mb-0">{`${testimonial.first_name} ${testimonial.last_name}`}</h5>
                <span>{testimonial.job}</span>
                <p>{testimonial.description}</p>
                <div className="ratings">
                  <i>{testimonial.mark}</i>
                </div>
                {isAuth && <img src='Edit.svg' alt='Modifier un avis' className="btn m-2" onClick={() => handleModalOpen(testimonial)} />}
                {isAuth && <img src='Delete.svg' alt='Supprimer un avis' className="btn m-2" onClick={() => { handleDeleteTestimonial(testimonial.testimonial_id) }} />}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un avis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTestimonial onSubmit={handleAddTestimonial} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Fermer</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={isUpdateModalOpen} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier l'avis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTestimonial && <EditTestimonial testimonial={selectedTestimonial} onSubmit={handleUpdateTestimonial} />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>Fermer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Testimonial;
