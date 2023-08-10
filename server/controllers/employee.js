const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');
const db = require('../db');



exports.createEmployee = async (req, res) => {
  const { email, password, name} = req.body;
  try {

    const hashedPassword = await hash(password, 10)

    await db.query('INSERT INTO users (user_email, user_password, role, user_name) VALUES ($1, $2, $3, $4) RETURNING *',[
      email,
      hashedPassword,
      'employee',
      name
    ]);

    return res.status(201).json({
      success: true,
      message: 'Employé créé avec succès',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}


exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.user_email,
  }

  try {
    const token = await sign(payload, SECRET)
       
    return res.status(200).cookie('token', token, { httpOnly: true }).json(
      {
      success: true,
      info: 'Connexion réalisée avec succès',
      role: user.role,
      name: user.user_name
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Déconnexion réalisée avec succès',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
