const { SERVER_URL } = require('../constants');
const db = require('../db')

 exports.addService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image_path = req.file.path

    const query = `INSERT INTO services (title, description, image_path)
                   VALUES ($1, $2, $3) RETURNING *`;

    const values = [title, description, image_path];

    await db.query(query, values);

    res.status(201).json({info: 'Service ajouté avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 

  exports.getService = async (req, res) => {
  try {
    const query = 'SELECT * FROM services';
    const result = await db.query(query);
    const services = result.rows;

    // Remplacer l'URL du chemin de l'image par le chemin local sur le serveur
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
    const { title, description } = req.body;
    const image_path = req.files['image'][0].path;
    await db.query(
      "UPDATE services SET title = $1, description = $2, image_path = $3 WHERE service_id = $4",
      [title, description, image_path, id]
    );

    res.status(200).json({info: 'Service modifié avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM services WHERE service_id = $1`;

    const values = [id];

    await db.query(query, values);

    res.status(201).json({info: 'Service supprimé avec succès'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
