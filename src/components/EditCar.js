import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { onUpdateCar } from '../api/cars';

const EditCar = ({ car, onSubmit }) => {

  const [carData, setCarData] = useState({ ...car });
  const [image_path, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(carData).forEach((key) => {
        if (carData[key] !== car[key]) {
          formData.append(key, carData[key]);
        }
      });

      image_path && formData.append('image_path', image_path);
      gallery.length > 0 && gallery.forEach((file) => {
        formData.append('gallery', file);
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="brand">
        <Form.Label>Marque</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={carData.brand}
          onChange={handleInputChange}
          placeholder="Entrez la marque"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="car_name">
        <Form.Label>Nom de la voiture</Form.Label>
        <Form.Control
          type="text"
          name="car_name"
          value={carData.car_name}
          onChange={handleInputChange}
          placeholder="Entrez le nom de la voiture"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="fuel_type">
        <Form.Label>Type de carburant</Form.Label>
        <Form.Control
          as="select"
          name="fuel_type"
          value={carData.fuel_type}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez le type de carburant</option>
          <option value="gazole">Gazole</option>
          <option value="essence">Essence</option>
          <option value="hybride">Hybride</option>
          <option value="electrique">Électrique</option>
        </Form.Control>
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
          min="1900"
          max="2099"
          step="1"
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
      <Form.Group className="mb-3" controlId="seat">
        <Form.Label>Nombre de places</Form.Label>
        <Form.Control
          as="select"
          name="seat"
          value={carData.seat}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez le nombre de places</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="doors">
        <Form.Label>Nombre de portes</Form.Label>
        <Form.Control
          as="select"
          name="doors"
          value={carData.doors}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez le nombre de portes</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="automatic">
        <Form.Label>Transmission</Form.Label>
        <Form.Control
          as="select"
          name="automatic"
          value={carData.automatic}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez le type de transmission</option>
          <option value="Manuelle">Manuelle</option>
          <option value="Automatique">Automatique</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={carData.description}
          onChange={handleInputChange}
          placeholder="Entrez la description"
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
      <Button variant="success" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
};

export default EditCar;
