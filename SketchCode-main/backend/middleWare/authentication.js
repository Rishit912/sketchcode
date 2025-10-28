const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../modles/user"); // Path to your User model

// Use the same fallback secret used elsewhere to avoid verification mismatch when JWT_KEY isn't set.
// IMPORTANT: For production, set process.env.JWT_KEY to a secure value and remove or rotate the fallback.
const jwtKey = process.env.JWT_KEY || 'your_fallback_secret';

// 1. Basic Token Verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: true, message: "No valid token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtKey);
    // IMPORTANT: Attach the decoded payload to the request
    req.user = decoded; 
    // Helpful debug when running in environments where tokens fail validation
    // (will appear in server logs)
    // console.log('verifyToken: decoded token payload:', decoded);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(403).json({ error: true, message: "Invalid or expired auth token" });
  }
};

// 2. New Admin Verification Middleware (Checks role in DB)
const verifyAdmin = async (req, res, next) => {
    // Check if verifyToken ran successfully
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: true, message: "Unauthorized: Missing user ID." });
    }

    try {
        // Fetch user from DB to check role
        // This is safe because user roles can be updated in the DB without issuing a new token
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found." });
        }

        // The core check: user must have the 'admin' role
        if (user.role !== 'admin') {
            return res.status(403).json({ error: true, message: "Forbidden: Not an admin." });
        }

        // If admin, proceed
        next();
    } catch (error) {
        console.error("Admin verification error:", error);
        res.status(500).json({ error: true, message: "Internal server error during role check." });
    }
}

module.exports = { verifyToken, verifyAdmin };