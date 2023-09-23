const db = require("../db");

exports.getOpeningHours = async (req, res) => {
  try {
    const query = "SELECT * FROM opening_hours";
    const result = await db.query(query);
    const openingHours = result.rows;

    res.json(openingHours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOpeningHours = async (req, res) => {
  const openingHoursData = req.body;

  try {
    for (const item of openingHoursData) {
      const query = `UPDATE opening_hours 
                     SET morning_open = $1, morning_close = $2, afternoon_open = $3, afternoon_close = $4 
                     WHERE day = $5`;
      const values = [
        item.morning_open,
        item.morning_close,
        item.afternoon_open,
        item.afternoon_close,
        item.day,
      ];

      await db.query(query, values);
    }

    res.json({ info: "Horaires d'ouverture mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la mise à jour des horaires d'ouverture",
      });
  }
};
