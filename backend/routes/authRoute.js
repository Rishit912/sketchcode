const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modles/user");
const { isConnected } = require("../config/db");
const { sendOTPEmail } = require("../config/email");
const crypto = require("crypto");

// Only allow OTP login for a specific admin email (default: flitcode.dev@gmail.com)
const allowedEmail = (process.env.OTP_ALLOWED_EMAIL || 'flitcode.dev@gmail.com').toLowerCase();

const router = express.Router();

// Utility to generate token
const generateToken = (id, role) => {
    const secret = process.env.JWT_KEY;
    if (!secret) {
        throw new Error('JWT_KEY environment variable is not set');
    }
    return jwt.sign(
        { id: id, role: role },
        secret, 
        { expiresIn: "1d" }
    );
};

// --------------------------------------------------------
// NEW ROUTE: Admin Registration (Used once to create the first user)
// @route POST /api/auth/register
// --------------------------------------------------------

// --------------------------------------------------------
// EXISTING ROUTE: Admin login - Step 1: Verify credentials and send OTP
// @route POST /api/auth/login
// --------------------------------------------------------
router.post("/login", async (req, res) => {
    try {
        if (!isConnected()) {
            return res.status(503).json({ 
                message: "Service temporarily unavailable: database not connected",
                retryAfter: 10
            });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Enforce single allowed admin email
        if (email.toLowerCase() !== allowedEmail) {
            return res.status(403).json({ message: "Access restricted to the configured admin email" });
        }

        // Must explicitly select password and role because password is select: false and we need role for admin check
        const user = await User.findOne({ email }).select('+password role'); 
        
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Only allow login for admin users
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied: Only admin can log in." });
        }

        // Use the matchPassword method from the user.js model
        const isMatch = await user.matchPassword(password); 
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to user document
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP via email
        try {
            await sendOTPEmail(email, otp);
            const responsePayload = { 
                message: "OTP sent to your email",
                requiresOTP: true,
                email: email
            };
            // In non-production, also return OTP to help local testing
            if (process.env.NODE_ENV !== 'production') {
                responsePayload.otpDev = otp;
            }
            res.json(responsePayload);
        } catch (emailError) {
            console.error("Failed to send OTP email:", emailError);
            res.status(500).json({ message: "Failed to send OTP. Please try again." });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --------------------------------------------------------
// NEW ROUTE: Verify OTP and complete login
// @route POST /api/auth/verify-otp
// --------------------------------------------------------
router.post("/verify-otp", async (req, res) => {
    try {
        if (!isConnected()) {
            return res.status(503).json({ 
                message: "Service temporarily unavailable: database not connected",
                retryAfter: 10
            });
        }

        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        // Enforce allowed admin email
        if (email.toLowerCase() !== allowedEmail) {
            return res.status(403).json({ message: "Access restricted to the configured admin email" });
        }

        // Find user and select OTP fields
        const user = await User.findOne({ email }).select('+otp +otpExpiry role');
        
        if (!user) {
            return res.status(400).json({ message: "Invalid request" });
        }

        // Check if OTP exists
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "No OTP found. Please request a new one." });
        }

        // Check if OTP is expired
        if (new Date() > user.otpExpiry) {
            // Clear expired OTP
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // Verify OTP
        if (user.otp !== otp.trim()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP is valid, clear it and generate token
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        // Generate token with role
        const token = generateToken(user._id, user.role);
        res.json({ 
            token,
            user: { email: user.email },
            message: "Login successful"
        });
    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --------------------------------------------------------
// NEW ROUTE: Resend OTP
// @route POST /api/auth/resend-otp
// --------------------------------------------------------
router.post("/resend-otp", async (req, res) => {
    try {
        if (!isConnected()) {
            return res.status(503).json({ 
                message: "Service temporarily unavailable: database not connected",
                retryAfter: 10
            });
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Enforce allowed admin email
        if (email.toLowerCase() !== allowedEmail) {
            return res.status(403).json({ message: "Access restricted to the configured admin email" });
        }

        const user = await User.findOne({ email }).select('role');
        
        if (!user) {
            return res.status(400).json({ message: "Invalid request" });
        }

        // Generate new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to user document
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP via email
        try {
            await sendOTPEmail(email, otp);
            const responsePayload = { 
                message: "New OTP sent to your email",
                success: true
            };
            // In non-production, also return OTP to help local testing
            if (process.env.NODE_ENV !== 'production') {
                responsePayload.otpDev = otp;
            }
            res.json(responsePayload);
        } catch (emailError) {
            console.error("Failed to send OTP email:", emailError);
            res.status(500).json({ message: "Failed to send OTP. Please try again." });
        }
    } catch (error) {
        console.error("Resend OTP error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;