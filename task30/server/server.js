import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Multer
const upload = multer({
  storage: multer.memoryStorage()
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Kanban API is working!"
  });
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*");

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data);
});

// Update task
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { list_id } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .update({
      list_id: list_id
    })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data);
});

// Upload attachment
app.post(
  "/api/tasks/:id/attachment",
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;

    // Check file
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    // Create unique file name
    const fileName = `${Date.now()}-${req.file.originalname}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("attachment")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (uploadError) {
      return res.status(500).json({
        error: uploadError.message
      });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("attachment")
      .getPublicUrl(fileName);

    const attachmentUrl = urlData.publicUrl;

    // Save URL in tasks table
    const { data, error } = await supabase
      .from("tasks")
      .update({
        attachment_url: attachmentUrl
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.json({
      message: "File uploaded successfully",
      attachment_url: attachmentUrl,
      task: data
    });
  }
);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});