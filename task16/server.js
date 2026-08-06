require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Multer (Temporary Upload Folder)
const upload = multer({
  dest: "uploads/",
});

// Home Route
app.get("/", (req, res) => {
  res.send("Profile Upload API Running...");
});

// Upload Route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image selected",
      });
    }

    // Read file
    const file = fs.readFileSync(req.file.path);

    // Unique filename
    const fileName = `${Date.now()}-${req.file.originalname}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("pic")
      .upload(fileName, file, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Get Public URL
    const { data: publicData } = supabase.storage
      .from("pic")
      .getPublicUrl(fileName);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      file: data,
      imageUrl: publicData.publicUrl,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});