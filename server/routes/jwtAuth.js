const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

//registering

router.post("/register",validInfo, async (req, res) => {
  try {
    
    //1. destructure the request.body (name, email, password)

    const { name, email, password } = req.body;

    //2. check if the user exist (if exist then throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
      email
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("user already exist")
    }

    //3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword =  await bcrypt.hash(password, salt)

    //4. enter the user inside our database

    const newUser = await pool.query
    ("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bcryptPassword])
    //5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id)

    res.json({ token })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
})

//login route

router.post("/login",validInfo, async (req, res) => {
  try {
    
    //1. destructure the req.body

    const { email, password } = req.body;

    //2. check if user doesn't exist (if not then we throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ])

    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect")
    }

    //3. check if the incomming password is the same as the database password

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect")
    }

    //4. give them the jwt token

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
})

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
})

module.exports = router;