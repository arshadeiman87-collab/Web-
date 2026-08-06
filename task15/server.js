const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabaseAdmin = require("./supabaseAdmin");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Admin Users Route
app.get("/admin/users", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      totalUsers: data.users.length,
      users: data.users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});