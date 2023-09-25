import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { updateService } from "../../../api/services";

const EditService = ({ service, onSubmit }) => {
  const [serviceData, setServiceData] = useState({
    service_id: service.service_id,
    title: service.title,
    description: service.description,
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
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

      Object.keys(serviceData).forEach((key) => {
        if (serviceData[key] !== service[key]) {
          formData.append(key, serviceData[key]);
        }
      });

      image && formData.append("image_path", image);

      if (!formData.entries().next().done) {
        try {
          const response = await updateService(
            serviceData.service_id,
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
    const segments = path.split("\\");
    const fileName = segments[segments.length - 1];
    return fileName;
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
        <Form.Label>Image Principale :</Form.Label>
        <p>{getFileNameFromPath(service.image_path)}</p>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image_path"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      <button className="custom__btn form__btn m-auto mt-5" type="submit">
        Enregistrer
      </button>
    </Form>
  );
};

export default EditService;
