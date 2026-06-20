import express from "express";
import { getMessages, markAsRead, deleteMessage } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes here are admin-only
router.get("/", protect, getMessages);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;
