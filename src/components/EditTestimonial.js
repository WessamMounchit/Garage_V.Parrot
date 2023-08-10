import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { onUpdateTestimonial } from '../api/testimonials';

const EditTestimonial = ({ testimonial, onSubmit }) => {
  const [testimonialData, setTestimonialData] = useState({
    testimonial_id: testimonial.testimonial_id,
    first_name: testimonial.first_name,
    last_name: testimonial.last_name,
    job: testimonial.job,
    description: testimonial.description,
    mark: testimonial.mark
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestimonialData({
      ...testimonialData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(testimonialData).forEach((key) => {
        if (testimonialData[key] !== testimonial[key]) {
          formData.append(key, testimonialData[key]);
        }
      });

      image && formData.append('image_path', image);

      if (formData.entries().next().done === false) {
        try {
          const response = await onUpdateTestimonial(
            testimonialData.testimonial_id,
            formData
          );
          toast.success(response.data.info);
          onSubmit();
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFileNameFromPath = (path) => {
    const segments = path.split('\\');
    const fileName = segments[segments.length - 1];
    return fileName;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>Prénom</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={testimonialData.first_name}
          onChange={handleInputChange}
          placeholder="Entrez le prénom"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={testimonialData.last_name}
          onChange={handleInputChange}
          placeholder="Entrez le nom"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="job">
        <Form.Label>Métier</Form.Label>
        <Form.Control
          type="text"
          name="job"
          value={testimonialData.job}
          onChange={handleInputChange}
          placeholder="Entrez le métier"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Avis</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={testimonialData.description}
          onChange={handleInputChange}
          placeholder="Entrez l'avis"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="mark">
        <Form.Label>Note /10</Form.Label>
        <Form.Control
          type="number"
          name="mark"
          value={testimonialData.mark}
          onChange={handleInputChange}
          placeholder="Entrez la note"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image_path">
        <Form.Label>Image de profil :</Form.Label>
        <p>{getFileNameFromPath(testimonial.image_path)}</p>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image_path"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
};

export default EditTestimonial;
