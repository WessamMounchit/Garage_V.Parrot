import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { onAddService } from '../api/services';

const AddService = ( { onSubmit }) => {
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

      const response = await onAddService(formData)
      toast.success(response.data.info)
      onSubmit()
    } catch (error) {
      toast.error(error.response.data.error)
      console.error(error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title">Titre du service</label>
        <input
          type="text"
          id="title"
          name="title"
          value={serviceData.title}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description du service</label>
        <textarea
          id="description"
          name="description"
          value={serviceData.description}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image">Image du service</label>
        <input
          type="file"
          id="image_path"
          onChange={handleImageChange}
          name="image_path"
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">Ajouter le service</button>
    </form>
  );
};

export default AddService;
