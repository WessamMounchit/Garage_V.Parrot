import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { onUpdateCar } from '../api/cars';

const EditCar = ({ car, onSubmit }) => {

  const [carData, setCarData] = useState({
    car_id: car.car_id,
    model: car.model,
    price: car.price,
    year: car.year,
    mileage: car.mileage,
    features: car.features,
    equipment: car.equipment
  });

  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleGalleryChange = (event) => {
    const selectedFiles = [...event.target.files];
    setGallery(selectedFiles);
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

      Object.keys(carData).forEach((key) => {
        if (carData[key] !== car[key]) {
          formData.append(key, carData[key]);
        }
      });

      image && formData.append('image_path', image);
        
      gallery.length > 0 && gallery.forEach((file) => {
          formData.append('gallery', file);
        });
      
      carData.features !== car.features && carData.features.forEach((feature) => {
        formData.append(`features`, feature);
      });
      carData.equipment !== car.equipment && carData.equipment.forEach((equipment) => {
        formData.append(`equipment`, equipment);
      });
      
      if (formData.entries().next().done === false) {
        try {
          const response = await onUpdateCar(carData.car_id, formData);
          toast.success(response.data.info)
          onSubmit()
        } catch (error) {
          toast.error(error.response.data.error)
          console.log(error)
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
      <Form.Group className="mb-3" controlId="model">
        <Form.Label>Modèle</Form.Label>
        <Form.Control
          type="text"
          name="model"
          value={carData.model}
          onChange={handleInputChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Prix</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={carData.price}
          onChange={handleInputChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="year">
        <Form.Label>Année de mise en circulation</Form.Label>
        <Form.Control
          type="number"
          name="year"
          value={carData.year}
          onChange={handleInputChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="mileage">
        <Form.Label>Kilométrage</Form.Label>
        <Form.Control
          type="number"
          name="mileage"
          value={carData.mileage}
          onChange={handleInputChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image Principale :</Form.Label>
        <p>{getFileNameFromPath(car.image_path)}</p>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="gallery">
        <Form.Label>Galerie d'images :</Form.Label>
        {car.gallery.map((image) => (<p>{getFileNameFromPath(image)}</p>))}
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
      <Button variant="success" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
};

export default EditCar;
