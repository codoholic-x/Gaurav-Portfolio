import express from "express";
import rateLimit from "express-rate-limit";
import { submitMessage } from "../controllers/contactController.js";

const router = express.Router();

// Limit contact form to 5 submissions per 15 minutes per IP to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many messages sent. Please try again later." },
});

// POST /api/contact — public submission only
router.post("/", contactLimiter, submitMessage);

export default router;
