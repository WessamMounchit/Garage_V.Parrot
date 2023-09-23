const express = require("express");
const app = express();
const cors = require("cors");
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware pour gérer les requêtes multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware pour les cookies et la gestion d'authentification
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//PASSPORT MIDDLEWARE
require("./middleware/passport-middleware");

//ROUTES IMPORTS//
const employeeRoutes = require("./routes/employee");
const carsRoutes = require("./routes/cars");
const servicesRoutes = require("./routes/services");
const testimonialsRoutes = require("./routes/testimonials");
const openingHoursRoutes = require("./routes/openingHours");
const multer = require("multer");

//ROUTES//
app.use("/api", employeeRoutes);
app.use("/api", carsRoutes);
app.use("/api", servicesRoutes);
app.use("/api", testimonialsRoutes);
app.use("/api", openingHoursRoutes);

//MULTEUR ERRORS
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: "Veuillez fournir une image valide" });
  }
});

app.listen(PORT, () => {
  console.log(`Le serveur est en marche au port ${PORT}`);
});
