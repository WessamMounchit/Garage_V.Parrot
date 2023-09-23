const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants/index");

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Pas autorisé");
    }

    const payload = jwt.verify(jwtToken, SECRET);

    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Pas autorisé");
  }
};
