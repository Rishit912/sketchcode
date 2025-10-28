const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const projectRoutes = require("./routes/projectRoute");
const teamRoutes = require("./routes/teamRoute");
const User = require("./modles/user"); // Add this line
const jwt = require("jsonwebtoken"); // Add this line

const PORT = process.env.PORT || 8001;

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration (CRITICAL FIX)
// Replace these with your actual domains
const allowedOrigins = [
    'http://localhost:8001', 
    'https://sketchcode-alpha.vercel.app', // <--- YOUR VERCEL URL
    'https://sketchcode.onrender.com', // <--- Your Render URL (optional, but safe)
    'https://sketchcode.one' // <--- YOUR CUSTOM DOMAIN
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

// Route Definitions
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoutes);
app.use("/api/team", teamRoutes);

// Simple diagnostic route
app.get("/ping", (req, res) => {
    res.status(200).json({ error: false, message: "Pong" });
});

// Admin setup endpoint (KEEPING THIS TEMPORARILY)
// This is used by your new frontend button to register the first admin.
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before creating the user (handled by model pre-save hook)
        const newUser = await User.create({ email, password });

        // Generate token and respond (assuming authRoute has access to generateToken)
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            process.env.JWT_KEY || 'your_fallback_secret', 
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


// Start server after attempting DB connection.
const startServer = async () => {
    await connectDB(); // connectDB handles retries and logging

    app.listen(PORT, () => console.log("Server Running on PORT:", PORT));
};

startServer();
