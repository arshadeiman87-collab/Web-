import express from "express";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  res.json({
    success: true,
    message: "User data is valid!",
    user: req.body
  });
});

export default router;