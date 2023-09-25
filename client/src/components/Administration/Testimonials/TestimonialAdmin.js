import React, { useEffect, useState } from "react";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import fetchData from "../../../utils/fetchData";
import {
  deleteTestimonial,
  getTestimonials,
  validateTestimonial,
} from "../../../api/testimonials";
import CustomModal from "../../UI/CustomModal";
import TestimonialItem from "../../Testimonials/TestimonialItem";
import { toast } from "react-toastify";
import AddTestimonial from "./AddTestimonial";
import EditTestimonial from "./EditTestimonial";

const TestimonialAdmin = () => {
  //////////  STATE   //////////

  const [testimonials, setTestimonials] = useState({
    loading: false,
    error: false,
    data: undefined,
  });
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchData(setTestimonials, getTestimonials);
  }, []);

  //////////  HANDLE MODALS   //////////

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

  //////////  API   //////////

  const handleAddTestimonial = async () => {
    try {
      fetchData(setTestimonials, getTestimonials);

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTestimonial = async () => {
    try {
      fetchData(setTestimonials, getTestimonials);

      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      const response = await deleteTestimonial(testimonialId);
      toast.success(response.data.info);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setTestimonials, getTestimonials);
  };

  const handleValidateTestimonial = async (testimonialId, validated) => {
    try {
      const response = await validateTestimonial(testimonialId, validated);
      toast.success(response.data.info);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setTestimonials, getTestimonials);
  };

  const addIcon = (
    <i
      className="btn ri-add-circle-line add__icon text-end ri-lg p-0 "
      onClick={() => setIsAddModalOpen(true)}
    ></i>
  );

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
    const sortedTestimonials = [...testimonials.data].sort(
      (a, b) => a.testimonial_id - b.testimonial_id
    );

    content = (
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
          {sortedTestimonials?.map((testimonial) => (
            <tr key={testimonial.testimonial_id}>
              <th scope="row">{testimonial.testimonial_id}</th>
              <td data-label="Prénom">{testimonial.first_name}</td>
              <td data-label="Nom">{testimonial.last_name}</td>
              <td data-label="Métier">{testimonial.job}</td>
              <td data-label="Validation">
                {testimonial.validated ? (
                  <i className="ri-checkbox-circle-line ri-lg check__icon p-0 "></i>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip
                        id={`tooltip-validate-${testimonial.testimonial_id}`}
                      >
                        Appuyez pour valider
                      </Tooltip>
                    }
                  >
                    <i
                      className="btn ri-hourglass-line ri-lg hourglass__icon p-0 "
                      onClick={() =>
                        handleValidateTestimonial(
                          testimonial.testimonial_id,
                          true
                        )
                      }
                    ></i>
                  </OverlayTrigger>
                )}
              </td>
              <td data-label="Modifier">
                {
                  <i
                    className="btn ri-edit-box-line edit__icon ri-lg p-0 "
                    onClick={() => handleModalOpen(testimonial)}
                  ></i>
                }
              </td>
              <td data-label="Supprimer">
                {
                  <i
                    className="btn ri-delete-bin-line delete__icon ri-lg p-0 "
                    onClick={() =>
                      handleDeleteTestimonial(testimonial.testimonial_id)
                    }
                  ></i>
                }
              </td>
              <td data-label="Détails">
                <i
                  onClick={() => handleViewModalOpen(testimonial)}
                  className="btn ri-eye-line ri-lg eye__icon p-0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <Container>
      <div className="text-end me-4">{addIcon}</div>
      {content}

      <CustomModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        title="Ajouter un avis"
      >
        {selectedTestimonial && (
          <TestimonialItem testimonial={selectedTestimonial} />
        )}
      </CustomModal>

      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un avis"
      >
        <AddTestimonial onSubmit={handleAddTestimonial} />
      </CustomModal>

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={handleModalClose}
        title="Modifier un avis"
      >
        {selectedTestimonial && (
          <EditTestimonial
            testimonial={selectedTestimonial}
            onSubmit={handleUpdateTestimonial}
          />
        )}
      </CustomModal>
    </Container>
  );
};

export default TestimonialAdmin;
