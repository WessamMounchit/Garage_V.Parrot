import React, { useState } from 'react';

const TestimonialForm = ({ onAddTestimonial }) => {
  const [testimonialData, setTestimonialData] = useState({
    name: '',
    comment: '',
    rating: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestimonialData({
      ...testimonialData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Vous pouvez implémenter ici la logique d'ajout du témoignage dans la base de données ou dans un tableau, etc.
    onAddTestimonial({ ...testimonialData });
    // Réinitialiser le formulaire après l'ajout
    setTestimonialData({
      name: '',
      comment: '',
      rating: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={testimonialData.name}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="comment">Commentaire</label>
        <textarea
          id="comment"
          name="comment"
          value={testimonialData.comment}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="rating">Note</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="0"
          max="5"
          value={testimonialData.rating}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Ajouter le témoignage</button>
    </form>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const handleAddTestimonial = (newTestimonial) => {
    setTestimonials([...testimonials, newTestimonial]);
  };

  return (
    <div className="container mt-5">
      <h2>Témoignages clients</h2>
      <TestimonialForm onAddTestimonial={handleAddTestimonial} />

      <div className="mt-5">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border mb-3 p-3">
            <p>Nom: {testimonial.name}</p>
            <p>Commentaire: {testimonial.comment}</p>
            <p>Note: {testimonial.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
