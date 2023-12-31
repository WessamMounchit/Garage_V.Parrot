import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { updateTestimonial } from "../../../api/testimonials";
import { useSelector } from "react-redux";

const EditTestimonial = ({ testimonial, onSubmit }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const [testimonialData, setTestimonialData] = useState({ ...testimonial });
  const [image_path, setImage_path] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage_path(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestimonialData({
      ...testimonialData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(testimonialData).forEach((key) => {
        if (testimonialData[key] !== testimonial[key]) {
          formData.append(key, testimonialData[key]);
        }
      });
      image_path && formData.append("image_path", image_path);
      isAuth && formData.append("validated", true);

      if (formData.entries().next().done === false) {
        try {
          const response = await updateTestimonial(
            testimonialData.testimonial_id,
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
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>Prénom</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={testimonialData.first_name}
          onChange={handleInputChange}
          placeholder="Entrez le prénom"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={testimonialData.last_name}
          onChange={handleInputChange}
          placeholder="Entrez le nom"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="job">
        <Form.Label>Métier</Form.Label>
        <Form.Control
          type="text"
          name="job"
          value={testimonialData.job}
          onChange={handleInputChange}
          placeholder="Entrez le métier"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Avis</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={testimonialData.description}
          onChange={handleInputChange}
          placeholder="Entrez l'avis"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="mark">
        <Form.Label>Nombre d'étoiles</Form.Label>
        <Form.Control
          as="select"
          name="mark"
          value={testimonialData.mark}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez le nombre d'étoiles</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="image_path">
        <Form.Label>Image de profil :</Form.Label>
        <p>{getFileNameFromPath(testimonial.image_path)}</p>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image_path"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
      {isAuth && <input type="hidden" name="validated" value="true" />}
      <button type="submit" className="custom__btn m-auto mt-5 form__btn">
        Enregistrer
      </button>
    </Form>
  );
};

export default EditTestimonial;
