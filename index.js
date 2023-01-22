const express = require("express");
const app = express();
const { User } = require("./db");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  try {
    res.send(
      "<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>"
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password
app.post("/register", async (req, res, next) => {
  try {
    const user = await req.body;
    const salt = 5;
    const hashed = await bcrypt.hash(user.password, salt);

    const newUser = await User.create({
      username: user.username,
      password: hashed,
    });
    console.log(newUser);
    res.send("successfully created user bobbysmiles");
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// POST /login
// TODO - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB

app.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    const passMatch = await bcrypt.compare(req.body.password, user.password);


    if (passMatch) {
      res.send("successfully logged in user bobbysmiles");
    } else {
      res.status(401).send("incorrect username or password")
    }

    // const isUserValid = bcrypt.compare(user.password, req.body.password);
  } catch (err) {
    next(err);
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
