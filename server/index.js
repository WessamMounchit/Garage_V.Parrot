const express = require("express");
const app = express();
const cors = require("cors");
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser');
const passport = require('passport');


//PASSPORT MIDDLEWARE
require('./middleware/passport-middleware');

//MIDDLEWARES
app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize());


//ROUTES IMPORTS//
const employeeRoutes = require('./routes/employee')

//ROUTES//
app.use("/api", employeeRoutes);
app.use("/auth", require("./routes/jwtAuth"));


app.listen(PORT, () => {
  console.log(`Le serveur est en marche au port ${PORT}`)
});