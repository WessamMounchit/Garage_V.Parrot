const express = require("express");
const app = express();
const cors = require("cors");
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const db = require('./db');

// Configuration de Multer pour enregistrer les images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads') 
  },
  filename: function (req, file, cb) {
    console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

// Middleware pour gérer les requêtes multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware pour les cookies et la gestion d'authentification
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//PASSPORT MIDDLEWARE
require('./middleware/passport-middleware');

//ROUTES IMPORTS//
const employeeRoutes = require('./routes/employee');
const { validationMiddleware } = require("./middleware/validation-middleware");

//ROUTES//

app.use("/api", employeeRoutes);
app.use("/auth", require("./routes/jwtAuth"));

app.post('/api/cars', validationMiddleware,  upload.fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'gallery', maxCount: 10 },
]),  async (req, res) => {
  try {
   
    const { model, price, year, mileage, features, equipment } = req.body;
    const image_path = req.files['image'][0].path;
    const gallery = req.files['gallery'].map((file) => file.path);

    const query = `INSERT INTO cars (model, price, year, mileage, image_path, gallery, features, equipment)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const values = [model, price, year, mileage, image_path, gallery, features, equipment];

    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Le serveur est en marche au port ${PORT}`)
});
