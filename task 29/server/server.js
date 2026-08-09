import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});