const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modles/user");
const { isConnected } = require("../config/db");

// Only allow login for a specific admin email
const allowedEmail = (process.env.ADMIN_EMAIL || 'flitcode.dev@gmail.com').toLowerCase();
// Static PIN for admin access (5-6 digits)
const adminPIN = process.env.ADMIN_PIN || '123456';

console.log(`🔐 Auth Route Initialized - Admin PIN: ${adminPIN} (length: ${adminPIN.length})`);

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

        // Credentials valid, require PIN verification
        res.json({ 
            message: "Please enter admin PIN",
            requiresPIN: true,
            email: email
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --------------------------------------------------------
// NEW ROUTE: Verify PIN and complete login
// @route POST /api/auth/verify-pin
// --------------------------------------------------------
router.post("/verify-pin", async (req, res) => {
    try {
        if (!isConnected()) {
            return res.status(503).json({ 
                message: "Service temporarily unavailable: database not connected",
                retryAfter: 10
            });
        }

        const { email, pin } = req.body;
        if (!email || !pin) {
            return res.status(400).json({ message: "Email and PIN are required" });
        }

        // Enforce allowed admin email
        if (email.toLowerCase() !== allowedEmail) {
            return res.status(403).json({ message: "Access restricted to the configured admin email" });
        }

        // Find user
        const user = await User.findOne({ email }).select('role');
        
        if (!user) {
            return res.status(400).json({ message: "Invalid request" });
        }

        // Verify PIN against env variable (accept 5 or 6 digits)
        const enteredPin = pin.trim();
        console.log(`🔐 PIN Verification: Entered="${enteredPin}", Expected="${adminPIN}", Length=${enteredPin.length}`);
        
        if (enteredPin.length < 5 || enteredPin.length > 6) {
            return res.status(400).json({ message: "PIN must be 5-6 digits" });
        }
        
        if (enteredPin !== adminPIN) {
            console.log(`❌ PIN mismatch: "${enteredPin}" !== "${adminPIN}"`);
            return res.status(400).json({ message: "Invalid PIN" });
        }

        // PIN is valid, generate token
        const token = generateToken(user._id, user.role);
        res.json({ 
            token,
            user: { email: user.email },
            message: "Login successful"
        });
    } catch (error) {
        console.error("PIN verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;