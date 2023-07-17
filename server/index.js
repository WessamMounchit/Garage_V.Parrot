const express = require("express");
const app = express();
const cors = require("cors");
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser');
const pool = require("./db")
const passport = require('passport');

//middleware
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser());
app.use(passport.initialize());



//ROUTES//
const employeeRoutes = require('./routes/employee')

//register and login routes

app.use("/api", employeeRoutes);
app.use("/auth", require("./routes/jwtAuth"));


//dashboard route

app.use("/dashboard", require('./routes/dashboard'))


app.listen(PORT, () => {
  console.log(`Le serveur est en marche au port ${PORT}`)
});









//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newCar = await pool.query("INSERT INTO car (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newCar.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})


//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM car");
    res.json(allTodos.rows)
  } catch (error) {
    console.error(error.message)
  }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM car WHERE car_id = $1", [id])

    res.json(todo.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE car SET description = $1 WHERE car_id = $2",
      [description, id]
    );

    res.json("Car a été mis à jour")
  } catch (error) {
    console.error(error.message)
  }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCar = await pool.query("DELETE FROM car WHERE car_id = $1", [
      id
    ]);

    res.json("a car was deleted")
  } catch (error) {
    console.error(error.message)
  }
})

/* auth 

const express = require('express');
const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const authRoutes = require('./auth');

const app = express();

// Autres configurations de l'application

// Routes pour l'administration
app.use('/admin', adminRoutes);

// Routes pour les employés
app.use('/employee', employeeRoutes);

// Routes d'authentification
app.use('/auth', authRoutes);

// Autres routes de l'application

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});*/
