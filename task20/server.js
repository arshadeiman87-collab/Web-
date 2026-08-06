require("dotenv").config();

const express = require("express");

const app = express();

console.log("SUPABASE URL:", process.env.SUPABASE_URL);
console.log("SUPABASE KEY:", process.env.SUPABASE_KEY);
console.log("JWT SECRET:", process.env.JWT_SECRET);

app.get("/", (req, res) => {
  res.send("Environment Variables Loaded Successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});