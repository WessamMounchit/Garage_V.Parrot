const db = require('../db')

exports.addCar = async (req, res) => {
  try {
    const { model, price, year, mileage, features, equipment } = req.body;
    const image_path = req.files['image'][0].path;
    const gallery = req.files['gallery'].map((file) => file.path);

    const query = `INSERT INTO cars (model, price, year, mileage, image_path, gallery, features, equipment)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const values = [model, price, year, mileage, image_path, gallery, features, equipment];

    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};