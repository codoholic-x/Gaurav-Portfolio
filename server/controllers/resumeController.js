import path from "path";
import { fileURLToPath } from "url";
import ResumeDownload from "../models/ResumeDownload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Download resume PDF + log the download
// @route   GET /api/resume/download
// @access  Public
export const downloadResume = async (req, res, next) => {
  try {
    await ResumeDownload.create({
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "",
    });

    const filePath = path.join(__dirname, "..", "public", "resume.pdf");
    res.download(filePath, "Gaurav_Pandey_Resume.pdf");
  } catch (error) {
    next(error);
  }
};

// @desc    Get resume download stats
// @route   GET /api/resume/stats
// @access  Private (admin)
export const getResumeStats = async (req, res, next) => {
  try {
    const totalDownloads = await ResumeDownload.countDocuments();
    const recent = await ResumeDownload.find().sort({ createdAt: -1 }).limit(20);
    res.json({ totalDownloads, recent });
  } catch (error) {
    next(error);
  }
};
