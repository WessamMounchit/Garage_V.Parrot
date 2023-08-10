import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { onAddCar } from '../api/cars';

const AddCar = ({ onSubmit }) => {
  const [carData, setCarData] = useState({
    model: '',
    price: '',
    year: '',
    mileage: '',
    features: [],
    equipment: [],
  });

  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    console.log(selectedFile);
  };

  const handleGalleryChange = (event) => {
    const selectedFiles = [...event.target.files];
    setGallery(selectedFiles);
    console.log(selectedFiles);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleFeaturesChange = (event) => {
    const { value } = event.target;
    const featuresArray = value.split('\n')//.map((feature) => feature.trim());
    setCarData({
      ...carData,
      features: featuresArray,
    });
  };

  const handleEquipmentChange = (event) => {
    const { value } = event.target;
    const equipmentArray = value.split('\n')//.map((equipment) => equipment.trim());
    setCarData({
      ...carData,
      equipment: equipmentArray,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append('model', carData.model);
      formData.append('price', carData.price);
      formData.append('year', carData.year);
      formData.append('mileage', carData.mileage);
      formData.append('image', image);

      gallery.forEach((file) => {
        formData.append(`gallery`, file);
      });

      carData.features.forEach((feature) => {
        formData.append(`features`, feature);
      });
      carData.equipment.forEach((equipment) => {
        formData.append(`equipment`, equipment);
      });

      const response = await onAddCar(formData);
      toast.success(response.data.info);
      onSubmit();

    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="model">
        <Form.Label>Modèle</Form.Label>
        <Form.Control
          type="text"
          name="model"
          value={carData.model}
          onChange={handleInputChange}
          placeholder="Entrez le modèle"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Prix</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={carData.price}
          onChange={handleInputChange}
          placeholder="Entrez le prix"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="year">
        <Form.Label>Année de mise en circulation</Form.Label>
        <Form.Control
          type="number"
          name="year"
          value={carData.year}
          onChange={handleInputChange}
          placeholder="Entrez l'année de mise en circulation"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="mileage">
        <Form.Label>Kilométrage</Form.Label>
        <Form.Control
          type="number"
          name="mileage"
          value={carData.mileage}
          onChange={handleInputChange}
          placeholder="Entrez le kilométrage"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image Principale</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="gallery">
        <Form.Label>Galerie d'images</Form.Label>
        <Form.Control
          type="file"
          onChange={handleGalleryChange}
          name="gallery"
          multiple
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="features">
        <Form.Label>Caractéristiques (séparées par des retours à la ligne)</Form.Label>
        <Form.Control
          as="textarea"
          name="features"
          value={carData.features.join('\n')}
          onChange={handleFeaturesChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="equipment">
        <Form.Label>Équipements et Options (séparés par des retours à la ligne)</Form.Label>
        <Form.Control
          as="textarea"
          name="equipment"
          value={carData.equipment.join('\n')}
          onChange={handleEquipmentChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Ajouter la voiture
      </Button>
    </Form>
  );
};

export default AddCar;
