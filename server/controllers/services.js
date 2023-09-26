const { SERVER_URL } = require("../constants");
const db = require("../db");
const fs = require("fs");

exports.addService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image_path = req.file.path;

    const query = `INSERT INTO services (title, description, image_path)
                   VALUES ($1, $2, $3) RETURNING *`;

    const values = [title, description, image_path];

    await db.query(query, values);

    res.status(201).json({ info: "Service ajouté avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const query = "SELECT * FROM services";
    const result = await db.query(query);
    const services = result.rows;

    const servicesWithLocalImagePath = services.map((service) => {
      return {
        ...service,
        image_path: `${SERVER_URL}/${service.image_path}`,
      };
    });

    res.json(servicesWithLocalImagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    const currentServiceQuery =
      "SELECT image_path FROM services WHERE service_id = $1";
    const currentServiceResult = await db.query(currentServiceQuery, [id]);
    const currentImagePath = currentServiceResult.rows[0].image_path;

    if (req.file) {
      updateFields.image_path = req.file.path;

      try {
        fs.unlinkSync(currentImagePath);
      } catch (err) {
        console.error(
          `La suppression du fichier a échoué pour le chemin ${currentImagePath}: ${err}`
        );
      }
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

    const query = `UPDATE services SET ${setQuery} WHERE service_id = $${
      values.length + 1
    } RETURNING *`;
    values.push(id);

    await db.query(query, values);

    res.status(200).json({ info: "Service modifié avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT image_path FROM services WHERE service_id = $1";
    const values = [id];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Service non trouvé" });
    }

    const serviceData = result.rows[0];
    const { image_path } = serviceData;

    const deleteQuery = `DELETE FROM services WHERE service_id = $1`;
    await db.query(deleteQuery, values);

    try {
      fs.unlinkSync(image_path);
    } catch (err) {
      console.error(`Failed to delete file at ${image_path}: ${err}`);
    }

    res.status(201).json({ info: "Service supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
