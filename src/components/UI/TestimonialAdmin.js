import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import fetchData from '../../utils/fetchData';
import { onDeleteTestimonial, onGetTestimonials, onValidateTestimonial } from '../../api/testimonials';
import CustomModal from './CustomModal';
import TestimonialItem from './TestimonialItem';
import '../../styles/testimonial-admin.css'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddTestimonial from '../AddTestimonial';
import EditTestimonial from '../EditTestimonial';

const TestimonialAdmin = () => {
  const [testimonials, setTestimonials] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const { isAuth } = useSelector((state) => state.auth);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchData(setTestimonials, onGetTestimonials);
  }, []);

  const handleViewModalOpen = (testimonial) => {
    setSelectedTestimonial({ ...testimonial });
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setSelectedTestimonial(null);
    setIsViewModalOpen(false);
  };

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

  const handleValidateTestimonial = async (testimonialId, validated) => {
    try {
      const response = await onValidateTestimonial(testimonialId, validated);
      toast.success(response.data.info);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setTestimonials, onGetTestimonials);
  };

  const addIcon = (
    <i
      className="btn ri-add-box-fill add__icon text-end ri-lg p-0 "
      onClick={() => setIsAddModalOpen(true)}>
    </i>
  )


  return (
    <Container>
      <span className='text-end'>{addIcon}</span>
      <table className="table styled-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Métier</th>
            <th scope="col">Validation</th>
            <th scope="col">Modifier</th>
            <th scope="col">Supprimer</th>
            <th scope="col">Détails</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.data?.map((testimonial) => (
            <tr key={testimonial.testimonial_id}>
              <th scope="row">{testimonial.testimonial_id}</th>
              <td>{testimonial.first_name}</td>
              <td>{testimonial.last_name}</td>
              <td>{testimonial.job}</td>
              <td>{testimonial.validated ? <i className="ri-checkbox-circle-fill ri-lg"></i> : <i className="btn ri-hourglass-fill ri-lg" onClick={() => handleValidateTestimonial(testimonial.testimonial_id, true)}></i>}</td>
              <td>{<i className="btn ri-edit-box-fill edit__icon ri-lg p-0 " onClick={() => handleModalOpen(testimonial)}></i>}</td>
              <td>{<i className="btn ri-delete-bin-fill delete__icon ri-lg p-0 " onClick={() => handleDeleteTestimonial(testimonial.testimonial_id)}></i>}</td>
              <td><button onClick={() => handleViewModalOpen(testimonial)} className='btn btn-info'>Voir en détails</button></td>
            </tr>
          ))}
        </tbody>
      </table>


      <CustomModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        title='Ajouter un avis'
      >
        {selectedTestimonial && <TestimonialItem testimonial={selectedTestimonial} />}
      </CustomModal>

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


    </Container>
  );
};

export default TestimonialAdmin;
