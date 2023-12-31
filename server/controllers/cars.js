const { SERVER_URL } = require("../constants");
const db = require("../db");
const fs = require("fs");

exports.addCar = async (req, res) => {
  try {
    const {
      brand,
      car_name,
      fuel_type,
      price,
      year,
      mileage,
      seat,
      doors,
      automatic,
      description,
    } = req.body;

    const image_path = req.files["image_path"][0].path;
    const gallery = req.files["gallery"].map((file) => file.path);

    const query = `
      INSERT INTO cars (
        brand,
        car_name,
        fuel_type,
        price,
        year,
        mileage,
        image_path,
        gallery,
        seat,
        doors,
        automatic,
        description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`;

    const values = [
      brand,
      car_name,
      fuel_type,
      price,
      year,
      mileage,
      image_path,
      gallery,
      seat,
      doors,
      automatic,
      description,
    ];

    await db.query(query, values);

    res.status(201).json({ info: "Voiture ajoutée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCar = async (req, res) => {
  try {
    const query = "SELECT * FROM cars";
    const result = await db.query(query);
    const cars = result.rows;

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
    const currentCarQuery =
      "SELECT image_path, gallery FROM cars WHERE car_id = $1";
    const currentCarResult = await db.query(currentCarQuery, [id]);
    const { image_path: currentImagePath, gallery: currentGallery } =
      currentCarResult.rows[0];

    if (req.files["image_path"] && req.files["image_path"][0]) {
      updateFields.image_path = req.files["image_path"][0].path;

      try {
        fs.unlinkSync(currentImagePath);
      } catch (err) {
        console.error(
          `La suppression du fichier a échoué pour le chemin ${currentImagePath}: ${err}`
        );
      }
    }

    if (req.files["gallery"] && req.files["gallery"].length > 0) {
      updateFields.gallery = req.files["gallery"].map((file) => file.path);

      currentGallery.forEach((imagePath) => {
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          console.error(
            `La suppression du fichier a échoué pour le chemin ${imagePath}: ${err}`
          );
        }
      });
    }

    const emptyFields = [];
    Object.keys(updateFields).forEach((key) => {
      if (!updateFields[key]) {
        emptyFields.push(key);
      }
    });

    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: `Les champs suivants sont vides : ${emptyFields.join(", ")}`,
      });
    }

    let setQuery = "";
    const values = [];

    Object.keys(updateFields).forEach((key, index) => {
      if (index !== 0) {
        setQuery += ", ";
      }
      setQuery += `${key} = $${index + 1}`;
      values.push(updateFields[key]);
    });

    const query = `UPDATE cars SET ${setQuery} WHERE car_id = $${
      values.length + 1
    } RETURNING *`;
    values.push(id);

    await db.query(query, values);

    res.status(200).json({ info: "Voiture modifiée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT image_path, gallery FROM cars WHERE car_id = $1";
    const values = [id];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    const carData = result.rows[0];
    const { image_path, gallery } = carData;

    const deleteQuery = `DELETE FROM cars WHERE car_id = $1`;
    await db.query(deleteQuery, values);

    try {
      fs.unlinkSync(image_path);
    } catch (err) {
      console.error(
        `La suppression du fichier a échoué pour le chemin ${image_path}: ${err}`
      );
    }

    for (const image of gallery) {
      if (image) {
        try {
          fs.unlinkSync(image);
        } catch (err) {
          console.error(
            `La suppression du fichier a échoué pour le chemin ${image}: ${err}`
          );
        }
      }
    }

    res.status(201).json({ info: "Voiture supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSelectedCar = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM cars WHERE car_id = $1";
    const values = [id];
    const result = await db.query(query, values);
    const car = result.rows[0];

    const carsWithLocalImagePath = {
      ...car,
      image_path: `${SERVER_URL}/${car.image_path}`,
      gallery: car.gallery.map((imagePath) => `${SERVER_URL}/${imagePath}`),
    };

    res.json(carsWithLocalImagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLatestCars = async (req, res) => {
  try {
    const query = "SELECT * FROM cars ORDER BY car_id DESC LIMIT 6";
    const result = await db.query(query);
    const cars = result.rows;

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
