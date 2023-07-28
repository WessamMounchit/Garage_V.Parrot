const { SERVER_URL } = require('../constants');
const db = require('../db')

 exports.addCar = async (req, res) => {
  try {
    const { model, price, year, mileage, features, equipment } = req.body;
    const image_path = req.files['image'][0].path;
    const gallery = req.files['gallery'].map((file) => file.path);

    const query = `INSERT INTO cars (model, price, year, mileage, image_path, gallery, features, equipment)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const values = [model, price, year, mileage, image_path, gallery, features, equipment];

    await db.query(query, values);

    res.status(201).json({info: 'Voiture ajoutée avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 

  exports.getCar = async (req, res) => {
  try {
    const query = 'SELECT * FROM cars';
    const result = await db.query(query);
    const cars = result.rows;

    // Remplacer l'URL du chemin de l'image par le chemin local sur le serveur
    const carsWithLocalImagePath = cars.map((car) => {
      return {
        ...car,
        image_path: `${SERVER_URL}/${car.image_path}`,
        gallery: car.gallery.map((imagePath) => `${SERVER_URL}/${imagePath}`),
      };
    });

    res.json(carsWithLocalImagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (req.files['image_path'] && req.files['image_path'][0]) {
      updateFields.image_path = req.files['image_path'][0].path;
    }

    if (req.files['gallery'] && req.files['gallery'].length > 0) {
      updateFields.gallery = req.files['gallery'].map((file) => file.path);
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

    const query = `UPDATE cars SET ${setQuery} WHERE car_id = $${values.length + 1} RETURNING *`;
    values.push(id);

    await db.query(query, values);

    res.status(200).json({info: 'Voiture modifiée avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM cars WHERE car_id = $1`;

    const values = [id];

    await db.query(query, values);

    res.status(201).json({info: 'Voiture supprimée avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
