import React, { useState } from 'react';
import { onAddCar } from '../api/cars';
import { toast } from 'react-toastify';

const AddCar = ( { onSubmit }) => {
  const [carData, setCarData] = useState({
    model: '',
    price: '',
    year: '',
    mileage: '',
    features: [],
    equipment: []
  });

  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    console.log(selectedFile)
  };

  const handleGalleryChange = (event) => {
    const selectedFiles = [...event.target.files];
    setGallery(selectedFiles);
    console.log(selectedFiles)
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

      const response = await onAddCar(formData)
      toast.success(response.data.info)
      onSubmit()
/*       setCarData({
        model: '',
        price: '',
        year: '',
        mileage: '',
        features: [],
        equipment: []
      });

      setGallery([])
      setImage(null)
 */
    } catch (error) {
      toast.error(error.response.data.error)
      console.error(error);
    }
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
        <label htmlFor="image">Image Principale</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          name="image"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="gallery">Galerie d'images</label>
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

      <button type="submit" className="btn btn-primary">Ajouter la voiture</button>
    </form>
  );
};

export default AddCar;
