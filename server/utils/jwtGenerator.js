const jwt = require("jsonwebtoken")
require("dotenv").config()

function jwtGenerator(user_id) {
  const payload = {
    user: user_id 
  }

  return jwt.sign(payload, process.env.SECRET,{expiresIn: "1hr"} )
}

module.exports = jwtGenerator;

/*La bonne fonction a mettre !!!

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: '1h', // Durée de validité du token
  };

  return jwt.sign(payload, SECRET_KEY, options);
}*/