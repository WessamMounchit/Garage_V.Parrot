const jwt = require("jsonwebtoken")
const { SECRET } = require("../constants/index")
function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  }

  return jwt.sign(payload, SECRET, { expiresIn: "1hr" })
}

module.exports = jwtGenerator;