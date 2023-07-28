import React, { useState } from 'react';
import { onUpdateCar } from '../api/cars';
import { toast } from 'react-toastify';

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

      /* formData.append('model', carData.model);
      formData.append('price', carData.price);
      formData.append('year', carData.year);
      formData.append('mileage', carData.mileage); */

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
        } catch (error) {
          toast.error(error.response.data.error)
        }
      }
      onSubmit()
            
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
          type="number"
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
        <label htmlFor="image">Image Principale :</label>
        <p>{getFileNameFromPath(car.image_path)}</p>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          name="image"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="gallery">Galerie d'images :</label>
        {car.gallery.map((image) => (<p>{getFileNameFromPath(image)}</p>))}
        <input
          type="file"
          id="gallery"
          onChange={handleGalleryChange}
          name="gallery"
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

      <button type="submit" className="btn btn-success">Enregistrer</button>
    </form>
  );
};

export default EditCar;
