import React, { useState } from 'react';

const CarForm = ({ onAddCar }) => {
  const [carData, setCarData] = useState({
    model: '',
    price: '',
    year: '',
    mileage: '',
    image: '',
    gallery: [],
    features: [],
    equipment: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleGalleryChange = (event) => {
    const { files } = event.target;
    const galleryArray = Array.from(files).map((file) => URL.createObjectURL(file));
    setCarData({
      ...carData,
      gallery: galleryArray,
    });
  };

  const handleFeaturesChange = (event) => {
    const { value } = event.target;
    const featuresArray = value.split('\n').map((feature) => feature.trim());
    setCarData({
      ...carData,
      features: featuresArray,
    });
  };

  const handleEquipmentChange = (event) => {
    const { value } = event.target;
    const equipmentArray = value.split('\n').map((equipment) => equipment.trim());
    setCarData({
      ...carData,
      equipment: equipmentArray,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCar({ ...carData });
    setCarData({
      model: '',
      price: '',
      year: '',
      mileage: '',
      image: '',
      gallery: [],
      features: [],
      equipment: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="model">Modèle</label>
        <input
          type="text"
          id="model"
          name="model"
          value={carData.model}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price">Prix</label>
        <input
          type="text"
          id="price"
          name="price"
          value={carData.price}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year">Année de mise en circulation</label>
        <input
          type="number"
          id="year"
          name="year"
          value={carData.year}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mileage">Kilométrage</label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          value={carData.mileage}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image">Image Principale</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="gallery">Galerie d'images</label>
        <input
          type="file"
          id="gallery"
          name="gallery"
          onChange={handleGalleryChange}
          multiple
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="features">Caractéristiques (séparées par des retours à la ligne)</label>
        <textarea
          id="features"
          name="features"
          value={carData.features.join('\n')}
          onChange={handleFeaturesChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="equipment">Équipements et Options (séparés par des retours à la ligne)</label>
        <textarea
          id="equipment"
          name="equipment"
          value={carData.equipment.join('\n')}
          onChange={handleEquipmentChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">Ajouter la voiture</button>
    </form>
  );
};

export default CarForm;
