import Project from "../models/Project.js";
import Message from "../models/Message.js";
import ResumeDownload from "../models/ResumeDownload.js";

// @desc    Get aggregate stats for the admin dashboard overview
// @route   GET /api/dashboard/stats
// @access  Private (admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const [projectCount, totalMessages, unreadMessages, resumeDownloads] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      ResumeDownload.countDocuments(),
    ]);

    const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      projectCount,
      totalMessages,
      unreadMessages,
      resumeDownloads,
      recentMessages,
    });
  } catch (error) {
    next(error);
  }
};
