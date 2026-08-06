require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");

const app = express();

app.use(express.json());

// Login Route
app.post("/login", (req, res) => {

  const user = {
    id: 1,
    name: "Eiman"
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({
    token
  });
});

// Protected Route
app.get("/profile", authMiddleware, (req, res) => {

  res.json({
    message: "Welcome!",
    user: req.user
  });

});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});