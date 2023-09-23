const { check } = require("express-validator");
const db = require("../db");
const { compare } = require("bcryptjs");

//email
const email = check("email")
  .isEmail()
  .withMessage("Veuillez fournir un email valide");

//password
const password = check("password")
  .isLength({ min: 10 })
  .withMessage("Le mot de passe doit contenir au moins 10 caractères")
  .matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/)
  .withMessage(
    "Le mot de passe doit contenir au moins une majuscule, un caractère spécial et un chiffre"
  );

// employee login validation
const LoginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * from users WHERE user_email = $1", [
    value,
  ]);

  if (!user.rows.length) {
    throw new Error("Cet email n'existe pas");
  }

  const validPassword = await compare(
    req.body.password,
    user.rows[0].user_password
  );

  if (!validPassword) {
    throw new Error("Mot de passe incorrect");
  }

  req.user = user.rows[0];
});

//check if employee email exists
const employeeEmailExists = check("email").custom(async (value) => {
  const { rows } = await db.query("SELECT * from users WHERE user_email = $1", [
    value,
  ]);

  if (rows.length) {
    throw new Error("Cet email existe déjà.");
  }
});

module.exports = {
  employeeRegisterValidation: [email, password, employeeEmailExists],
  LoginValidation: [LoginFieldsCheck],
};
