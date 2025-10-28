const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modles/user"); // Assumes User model is updated with hashing logic
const { isConnected } = require("../config/db");

const router = express.Router();

// Utility to generate token - FIX: Include user role in the token payload
const generateToken = (id, role) => {
    // Uses JWT_KEY from process.env (or a secure fallback secret)
    return jwt.sign(
        { id: id, role: role }, // ADDED ROLE HERE
        process.env.JWT_KEY || 'your_fallback_secret', 
        { expiresIn: "1d" }
    );
};

// --------------------------------------------------------
// NEW ROUTE: Admin Registration (Used once to create the first user)
// @route POST /api/auth/register
// --------------------------------------------------------
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // 2. Create the user (Password will be hashed automatically by user.js pre-save hook)
        // User model defaults to role: 'admin'
        const user = await User.create({ email, password });

        if (user) {
            return res.status(201).json({
                // FIX: Pass user.role to generateToken
                token: generateToken(user._id, user.role),
                user: { email: user.email },
                message: "Registration successful. You can now login."
            });
        } else {
            return res.status(400).json({ message: "Invalid user data received" });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

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

        // Must explicitly select password because it is set to select: false in the model
        const user = await User.findOne({ email }).select('+password'); 
        
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Use the matchPassword method from the user.js model
        const isMatch = await user.matchPassword(password); 
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // FIX: Must explicitly select role here since it's used to generate the token
        const userWithRole = await User.findOne({ email });
        if (!userWithRole) return res.status(500).json({ message: "User data fetch error" });
        
        // FIX: Pass userWithRole.role to generateToken
        const token = generateToken(userWithRole._id, userWithRole.role);
        
        res.json({ 
            token,
            user: { email: userWithRole.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;