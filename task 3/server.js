const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Built-in middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Custom Logger Middleware
const logger = (req, res, next) => {
  const now = new Date();

  const date = now.toLocaleDateString(); // e.g. 7/29/2026
  const time = now.toLocaleTimeString(); // e.g. 5:44:51 AM

  console.log(
    `Date: ${date} | Time: ${time} | Method: ${req.method} | URL: ${req.url}`
  );

  next();
};

// Use Logger Middleware
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Express Middleware!");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});