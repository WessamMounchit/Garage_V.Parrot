const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");
const db = require("../db");

exports.createEmployee = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "INSERT INTO users (user_email, user_password, role, user_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, "employee", name]
    );

    return res.status(201).json({
      success: true,
      message: "Employé créé avec succès",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.user_id,
    email: user.user_email,
  };

  try {
    const token = await sign(payload, SECRET);

    /* res.setHeader("Authorization", `Bearer ${token}`); */

    return res.status(200).header("Authorization", `Bearer ${token}`).json({
      success: true,
      info: "Connexion réalisée avec succès",
      role: user.role,
      name: user.user_name,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Déconnexion réalisée avec succès",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE role = $1";
    const values = ["employee"];
    const result = await db.query(query, values);
    const employees = result.rows;

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, newEmail } = req.body;

    let query;
    let values;

    if (email && name && newEmail) {
      const checkEmailQuery = "SELECT * FROM users WHERE user_email = $1";
      const checkEmailResult = await db.query(checkEmailQuery, [newEmail]);

      if (
        checkEmailResult.rows.length > 0 &&
        checkEmailResult.rows[0].user_id !== id
      ) {
        res.status(400).json({ error: "Le nouvel e-mail existe déjà." });
        return;
      }

      query =
        "UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING *";
      values = [name, newEmail, id];
    } else if (email && name) {
      query = "UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *";
      values = [name, id];
    } else if (email && newEmail) {
      const checkEmailQuery = "SELECT * FROM users WHERE user_email = $1";
      const checkEmailResult = await db.query(checkEmailQuery, [newEmail]);

      if (
        checkEmailResult.rows.length > 0 &&
        checkEmailResult.rows[0].user_id !== id
      ) {
        res.status(400).json({
          error: "Le nouvel e-mail existe déjà dans la base de données.",
        });
        return;
      }

      query = "UPDATE users SET user_email = $1 WHERE user_id = $2 RETURNING *";
      values = [newEmail, id];
    } else {
      res.status(400).json({
        error:
          "Veuillez fournir soit le nom et l'e-mail, soit l'e-mail actuel et le nouvel e-mail.",
      });
      return;
    }

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      res
        .status(404)
        .json({ error: "Aucun employé trouvé avec cet identifiant." });
    } else {
      res.status(200).json({
        info: "Informations de l'employé mises à jour avec succès",
        employee: result.rows[0],
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM users WHERE user_id = $1 RETURNING *";
    const values = [id];

    const result = await db.query(query, values);

    res.status(200).json({
      info: "Employé supprimé avec succès",
      deletedEmployee: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
