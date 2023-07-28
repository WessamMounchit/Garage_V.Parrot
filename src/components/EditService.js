import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { onUpdateService } from '../api/services';

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

      /* formData.append('title', serviceData.title);
         formData.append('description', serviceData.description); */

      Object.keys(serviceData).forEach((key) => {
        if (serviceData[key] !== service[key]) {
          formData.append(key, serviceData[key]);
        }
      });

      image && formData.append('image_path', image);

      if (formData.entries().next().done === false) {
        try {
          const response = await onUpdateService(serviceData.service_id, formData);
          toast.success(response.data.info)
          onSubmit()
        } catch (error) {
          toast.error(error.response.data.error)
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title">title</label>
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
        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={serviceData.description}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>


      <div className="mb-3">
        <label htmlFor="image">Image Principale :</label>
        <p>{getFileNameFromPath(service.image_path)}</p>
        <input
          type="file"
          id="image_path"
          onChange={handleImageChange}
          name="image_path"
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-success">Enregistrer</button>
    </form>
  );
};

export default EditService;
