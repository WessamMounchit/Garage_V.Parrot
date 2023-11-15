import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { addService } from "../../../api/services";
import Resizer from "react-image-file-resizer";

const AddService = ({ onSubmit }) => {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
  });

  const [image_path, setImage_path] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    Resizer.imageFileResizer(
      selectedFile,
      500, 
      750,
      "JPEG",
      100, 
      0, 
      (blob) => {
        
        setImage_path(blob);
      },
      "blob" 
    );
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

      formData.append("title", serviceData.title);
      formData.append("description", serviceData.description);
      formData.append("image_path", image_path);

      const response = await addService(formData);
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
          required
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
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image du service</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image_path"
          accept="image/png, image/jpeg"
          required
        />
      </Form.Group>
      <button className="custom__btn form__btn m-auto mt-5" type="submit">
        Ajouter le service
      </button>
    </Form>
  );
};

export default AddService;
