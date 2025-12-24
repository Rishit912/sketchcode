const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modles/user");
const { isConnected } = require("../config/db");

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
// EXISTING ROUTE: Admin login
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

        // Generate token with role
        const token = generateToken(user._id, user.role);
        res.json({ 
            token,
            user: { email: user.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;