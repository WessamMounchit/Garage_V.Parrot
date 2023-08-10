import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { onAddTestimonial } from '../api/testimonials';

const AddTestimonial = ({ onSubmit }) => {
  const [testimonialData, setTestimonialData] = useState({
    first_name: '',
    last_name: '',
    job: '',
    description: '',
    mark: null
  });

  const [image_path, setImage_path] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage_path(selectedFile);
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

      formData.append('first_name', testimonialData.first_name);
      formData.append('last_name', testimonialData.last_name);
      formData.append('job', testimonialData.job);
      formData.append('description', testimonialData.description);
      formData.append('mark', testimonialData.mark);
      formData.append('image_path', image_path);

      const response = await onAddTestimonial(formData);
      toast.success(response.data.info);
      onSubmit();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
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
        <Form.Label>Image de profil</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image_path"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Ajouter l'avis
      </Button>
    </Form>
  );
};

export default AddTestimonial;
