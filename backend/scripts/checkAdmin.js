const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../modles/user");

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
        console.log("✅ Connected to MongoDB");

        const admin = await User.findOne({ email: "flitcode.dev@gmail.com" }).select('+password');
        
        if (admin) {
            console.log("✅ Admin user found:");
            console.log(`   Email: ${admin.email}`);
            console.log(`   Role: ${admin.role}`);
            console.log(`   Password Hash: ${admin.password.substring(0, 30)}...`);
            console.log(`   Created At: ${admin.createdAt}`);
            
            // Test password matching
            const testPassword = "99093rrd@45049";
            const isMatch = await admin.matchPassword(testPassword);
            console.log(`   Password Match Test: ${isMatch ? "✅ SUCCESS" : "❌ FAILED"}`);
        } else {
            console.log("❌ Admin user NOT found in database");
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

checkAdmin();
