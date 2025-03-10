const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/User.js");
const handleError = require("../utils/errorHandler.js");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config(); // Load environment variables

// Configure Nodemailer with SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS requires false, SSL requires true
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

// ✅ Test Transporter Connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Email server error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// 🔹 Signup Route with Email Verification
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiration = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry

    // Create a new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiration,
      isVerified: false, // Default to false until verified
    });

    // Save the user to the database
    await newUser.save();

    // ✅ Corrected Verification URL
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const verificationUrl = `${clientUrl}`;


    // Mail options for the verification email
    const mailOptions = {
      from: `"ReelTime Team" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Email Verification",
      text: `Hello ${username},\n\nPlease verify your email by clicking on the following link:\n\n${verificationUrl}\n\nBest Regards,\nReelTime Team`,
      replyTo: process.env.ADMIN_EMAIL,
    };

    // Send the verification email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Verification email sent:", info.response);
      res.status(200).json({
        message: "Signup successful! Please check your email to verify your account.",
      });
    } catch (emailError) {
      console.error("❌ Error sending email:", emailError);
      return res.status(500).json({ message: "Failed to send verification email." });
    }

  } catch (error) {
    handleError(res, error, "Server error during signup");
  }
});

// 🔹 Email Verification Route
router.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token." });
    }

    // Check if the token has expired
    if (user.verificationTokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Verification token has expired." });
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verificationToken = null; // Remove the token after successful verification
    user.verificationTokenExpiration = null; // Remove expiration date

    // Save the user after marking it as verified
    await user.save();

    res.status(200).json({ message: "Email verified successfully! You can now log in." });
  } catch (error) {
    handleError(res, error, "Error during email verification.");
  }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in." });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      message: "Login successful!",
      token, // Return the JWT token to the client
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
});

module.exports = router;
