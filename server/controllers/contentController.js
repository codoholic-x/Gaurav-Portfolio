import SiteContent from "../models/SiteContent.js";

// @desc    Get site content (creates default doc if none exists)
// @route   GET /api/content
// @access  Public
export const getContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update site content
// @route   PUT /api/content
// @access  Private (admin)
export const updateContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create(req.body);
    } else {
      content = await SiteContent.findByIdAndUpdate(content._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};
