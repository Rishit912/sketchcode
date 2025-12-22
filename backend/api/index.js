const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("../config/db");
const authRoute = require("../routes/authRoute");
const projectRoutes = require("../routes/projectRoute");
const teamRoutes = require("../routes/teamRoute");
const User = require("../modles/user"); 
const jwt = require("jsonwebtoken");

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
    "https://flitcode-api.vercel.app"
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

// Registration Logic
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User already exists" });

        const newUser = await User.create({ email, password });
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_KEY || "your_fallback_secret",
            { expiresIn: "1d" }
        );

        res.status(201).json({ error: false, message: "Registration successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

// FOR LOCAL DEVELOPMENT
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// FOR VERCEL DEPLOYMENT
// Vercel takes the Express instance and turns it into a serverless function
module.exports = app;