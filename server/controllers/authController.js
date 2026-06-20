import Admin from "../models/Admin.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    generateTokenAndSetCookie(res, admin._id);

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
export const logoutAdmin = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully." });
};

// @desc    Get current logged-in admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  res.json(req.admin);
};
