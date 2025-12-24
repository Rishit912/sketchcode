const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../modles/user");

const setupAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
        console.log("✅ Connected to MongoDB");

        const email = "flitcode.dev@gmail.com";
        const password = "99093rrd@45049";

        // Check if admin already exists
        const adminExists = await User.findOne({ email });
        if (adminExists) {
            console.log("⚠️  Admin user already exists. Skipping creation.");
            await mongoose.disconnect();
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin user
        const adminUser = await User.create({
            email,
            password: hashedPassword,
            role: "admin",
        });

        console.log("✅ Admin user created successfully!");
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password} (hashed in database)`);
        console.log(`   Role: admin`);

        await mongoose.disconnect();
        console.log("✅ Database connection closed");
    } catch (error) {
        console.error("❌ Error setting up admin:", error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
};

setupAdmin();
