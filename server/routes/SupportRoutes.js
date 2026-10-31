
import express from "express";
import SupportTicket from "../models/SupportTicket.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import { sendEmail } from "../config/mailer.js";

const router = express.Router();

const allowedCategories = [
  "General question",
  "Account problem",
  "URL creation problem",
  "Analytics problem",
  "Report a bug",
  "Other",
];

// Escape user input before inserting it into email HTML
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

// Submit a support ticket
router.post("/tickets", auth, async (req, res) => {
  try {
    const { subject, category, message } = req.body;

    if (!subject?.trim() || !category || !message?.trim()) {
      return res.status(400).json({
        message: "Subject, category, and message are required.",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid support category.",
      });
    }

    if (subject.trim().length > 150) {
      return res.status(400).json({
        message: "Subject cannot exceed 150 characters.",
      });
    }

    if (message.trim().length > 5000) {
      return res.status(400).json({
        message: "Message cannot exceed 5000 characters.",
      });
    }

    // Find authenticated user
    const user = await User.findById(req.userId).select("name email");

    if (!user) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    // Save ticket in MongoDB
    const ticket = await SupportTicket.create({
      userId: req.userId,
      subject: subject.trim(),
      category,
      message: message.trim(),
    });

    const safeName = escapeHtml(user.name);
    const safeEmail = escapeHtml(user.email);
    const safeSubject = escapeHtml(subject.trim());
    const safeCategory = escapeHtml(category);
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

    // Send confirmation email to user
    try {
      await sendEmail({
        to: user.email,
        subject: `Support request received - ${ticket._id}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;color:#1e293b">
            <h2 style="color:#2563eb">Linkly Support</h2>
            <h3>Hello ${safeName},</h3>
            <p>Thank you for contacting us. We have received your support request.</p>

            <div style="background:#f8fafc;padding:16px;border-radius:8px">
              <p><strong>Ticket ID:</strong> ${ticket._id}</p>
              <p><strong>Subject:</strong> ${safeSubject}</p>
              <p><strong>Category:</strong> ${safeCategory}</p>
              <p><strong>Message:</strong><br>${safeMessage}</p>
              <p><strong>Status:</strong> Open</p>
            </div>

            <p>We'll review your request as soon as possible.</p>
            <p>Regards,<br>Linkly Support Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("User confirmation email failed:", emailError.message);
    }

    // Notify project owner
    if (process.env.SUPPORT_EMAIL) {
      try {
        await sendEmail({
          to: process.env.SUPPORT_EMAIL,
          subject: `New support ticket: ${subject.trim()}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;color:#1e293b">
              <h2>New Linkly Support Ticket</h2>
              <p><strong>Ticket ID:</strong> ${ticket._id}</p>
              <p><strong>User:</strong> ${safeName} (${safeEmail})</p>
              <p><strong>Subject:</strong> ${safeSubject}</p>
              <p><strong>Category:</strong> ${safeCategory}</p>
              <p><strong>Message:</strong><br>${safeMessage}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Owner notification email failed:", emailError.message);
      }
    }

    return res.status(201).json({
      message: "Support request submitted successfully.",
      ticket,
    });
  } catch (error) {
    console.error("Create support ticket error:", error);

    return res.status(500).json({
      message: "Unable to submit support request.",
    });
  }
});

// Get tickets belonging to the logged-in user
router.get("/my-tickets", auth, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.error("Get support tickets error:", error);

    return res.status(500).json({
      message: "Unable to retrieve support requests.",
    });
  }
});

export default router;
