const express = require("express");
const logger = require("./logger");

const app = express();

app.use(express.json());

// Normal route
app.get("/", (req, res) => {
  logger.info("Home route accessed");

  res.json({
    message: "Server is working",
  });
});

// Test error route
app.get("/error", (req, res, next) => {
  const error = new Error("Something went wrong!");

  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Server
app.listen(5000, () => {
  logger.info("Server started on port 5000");
});