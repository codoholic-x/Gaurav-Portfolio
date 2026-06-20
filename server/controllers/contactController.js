import Message from "../models/Message.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
      ip: req.ip,
    });

    // Fire and forget — don't block the response if email fails
    sendEmail({ name, email, subject, message }).catch((err) =>
      console.error("Email notification failed:", err.message)
    );

    res.status(201).json({ message: "Thanks for reaching out! I'll get back to you soon." , data: newMessage });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (admin)
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PATCH /api/messages/:id/read
// @access  Private (admin)
export const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found." });
    res.json(message);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private (admin)
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found." });
    res.json({ message: "Message deleted." });
  } catch (error) {
    next(error);
  }
};
