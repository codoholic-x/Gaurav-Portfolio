import express from "express";
import { downloadResume, getResumeStats } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/download", downloadResume);
router.get("/stats", protect, getResumeStats);

export default router;
