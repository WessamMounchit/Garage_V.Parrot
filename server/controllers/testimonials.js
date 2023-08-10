const { SERVER_URL } = require('../constants');
const db = require('../db')

 exports.addTestimonial = async (req, res) => {
  try {
    const { first_name, last_name, job, description, mark } = req.body;
    const image_path = req.file.path

    const query = `INSERT INTO testimonials (first_name, last_name, job, description, mark, image_path)
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [first_name, last_name, job, description, mark, image_path];

    await db.query(query, values);

    res.status(201).json({info: 'Avis ajouté avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 

  exports.getTestimonial = async (req, res) => {
  try {
    const query = 'SELECT * FROM testimonials';
    const result = await db.query(query);
    const testimonials = result.rows;

    const testimonialsWithLocalImagePath = testimonials.map((testimonial) => {
      return {
        ...testimonial,
        image_path: `${SERVER_URL}/${testimonial.image_path}`,
      };
    });

    res.json(testimonialsWithLocalImagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

     if (req.file) {
      updateFields.image_path = req.file.path;
    }
 
    const emptyFields = [];
    Object.keys(updateFields).forEach((key) => {
      if (!updateFields[key]) {
        emptyFields.push(key);
      }
    });

    if (emptyFields.length > 0) {
      return res.status(400).json({ error: `Les champs suivants sont vides : ${emptyFields.join(', ')}` });
    }

    let setQuery = '';
    const values = [];

    Object.keys(updateFields).forEach((key, index) => {
      if (index !== 0) {
        setQuery += ', ';
      }
      setQuery += `${key} = $${index + 1}`;
      values.push(updateFields[key]);
    });

    const query = `UPDATE testimonials SET ${setQuery} WHERE testimonial_id = $${values.length + 1} RETURNING *`;
    values.push(id);

    await db.query(query, values);

    res.status(200).json({info: 'Avis modifié avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM testimonials WHERE testimonial_id = $1`;

    const values = [id];

    await db.query(query, values);

    res.status(201).json({info: 'Avis supprimé avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
