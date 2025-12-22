const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("../config/db");
const authRoute = require("../routes/authRoute");
const projectRoutes = require("../routes/projectRoute");
const teamRoutes = require("../routes/teamRoute");
const User = require("../modles/user"); // Matches your 'modles' folder name
const jwt = require("jsonwebtoken");
const serverless = require("serverless-http");

const app = express();

// Middleware
app.use(express.json());

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

// Database Connection Logic for Serverless
const ensureDB = async () => {
    if (mongoose.connection && mongoose.connection.readyState === 1) return;
    await connectDB();
};

const handler = serverless(app);

// Export for Vercel
module.exports = async (req, res) => {
    await ensureDB();
    return handler(req, res);
};