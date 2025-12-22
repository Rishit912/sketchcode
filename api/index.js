const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("../backend/config/db");
const authRoute = require("../backend/routes/authRoute");
const projectRoutes = require("../backend/routes/projectRoute");
const teamRoutes = require("../backend/routes/teamRoute");
const User = require("../backend/modles/user");
const jwt = require("jsonwebtoken");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://www.flitcode.app",
    "https://flitcode.app",
    "https://flitcode.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"), false);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
    })
);

app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoutes);
app.use("/api/team", teamRoutes);

app.get("/ping", (req, res) => {
    res.status(200).json({ error: false, message: "Pong" });
});

app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({ email, password });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_KEY || "your_fallback_secret",
            { expiresIn: "1d" }
        );

        res.status(201).json({
            error: false,
            message: "Registration successful. Please log in now.",
            token
        });
    } catch (error) {
        console.error("Admin setup error:", error);
        res.status(500).json({ message: "Failed to create admin: " + error.message });
    }
});

// Ensure DB is connected for serverless invocations. Reuse connection if available.
const ensureDB = async () => {
    if (mongoose.connection && mongoose.connection.readyState === 1) return;
    await connectDB();
};

const handler = serverless(app);

module.exports = async (req, res) => {
    await ensureDB();
    return handler(req, res);
};
