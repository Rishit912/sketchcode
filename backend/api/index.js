const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("../config/db");
const authRoute = require("../routes/authRoute");
const projectRoutes = require("../routes/projectRoute");
const teamRoutes = require("../routes/teamRoute");

const app = express();

// Database Connection Middleware for Serverless
// This ensures DB connects before handling any request
const ensureDB = async (req, res, next) => {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
        return next();
    }
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ error: true, message: "Database connection failed" });
    }
};

// Middleware
app.use(express.json());
app.use(ensureDB); // Runs on every request

// CORS Configuration
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://flitcode.app",
    "https://flitcode.vercel.app",
    "https://www.flitcode.app",
    "https://flitcode-api.vercel.app",
    "https://flitcode-o-backend.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoutes);
app.use("/api/team", teamRoutes);

// Health Check
app.get("/ping", (req, res) => {
    res.status(200).json({ error: false, message: "Pong" });
});

// Health Check with /api prefix (for direct function hits like /api/ping)
app.get("/api/ping", (req, res) => {
    res.status(200).json({ error: false, message: "Pong" });
});

// Registration Logic - DISABLED
// Only the setup script can create the admin user
app.post("/api/auth/register", async (req, res) => {
    res.status(403).json({ 
        error: true, 
        message: "Registration is disabled. Only authorized admin setup is allowed." 
    });
});

// FOR LOCAL DEVELOPMENT
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
    const PORT = process.env.PORT || 5000;
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        console.error('❌ Failed to connect to MongoDB at startup:', err);
        process.exit(1);
    });
}

// FOR VERCEL DEPLOYMENT
// Export the Express app directly for Vercel serverless
module.exports = app;
module.exports.default = app;