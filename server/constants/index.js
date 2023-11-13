const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.PORT || 5000,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : "http://localhost:3000",
  SECRET: process.env.SECRET,
};
