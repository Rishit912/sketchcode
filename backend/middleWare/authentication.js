const jwt = require("jsonwebtoken");
const User = require("../modles/user");

// Get JWT secret from environment
const getJwtSecret = () => {
    const secret = process.env.JWT_KEY;
    if (!secret) {
        throw new Error('JWT_KEY environment variable is not set');
    }
    return secret;
};

// 1. Basic Token Verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: true, message: "No valid token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
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