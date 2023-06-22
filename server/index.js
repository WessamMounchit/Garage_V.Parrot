const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())


//ROUTES//

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));


//dashboard route

app.use("/dashboard", require("./routes/dashboard"))


















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

app.listen(5000, () => {
  console.log("Le serveur a démarrer au port 5000")
});


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