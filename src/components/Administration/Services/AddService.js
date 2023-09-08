import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import { onAddService } from '../../../api/services';

const AddService = ({ onSubmit }) => {
  const [serviceData, setServiceData] = useState({
    title: '',
    description: ''
  });

  const [image_path, setImage_path] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage_path(selectedFile);
    console.log(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append('title', serviceData.title);
      formData.append('description', serviceData.description);
      formData.append('image_path', image_path);

      const response = await onAddService(formData);
      toast.success(response.data.info);
      onSubmit();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Titre du service</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={serviceData.title}
          onChange={handleInputChange}
          placeholder="Entrez le titre du service"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description du service</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={serviceData.description}
          onChange={handleInputChange}
          placeholder="Entrez la description du service"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image du service</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image_path"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      <button className='custom__btn form__btn m-auto mt-5' type="submit">
        Ajouter le service
      </button>
    </Form>
  );
};

export default AddService;
