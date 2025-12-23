const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../modles/user");

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
        console.log("✅ Connected to MongoDB");

        // Delete existing admin
        await User.deleteOne({ email: "flitcode.dev@gmail.com" });
        console.log("✅ Deleted old admin user");

        // Create new admin - let the pre-save hook handle hashing
        const admin = await User.create({
            email: "flitcode.dev@gmail.com",
            password: "99093rrd@45049",  // Plain text - pre-save will hash it
            role: "admin",
        });

        console.log("✅ New admin user created!");
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: 99093rrd@45049`);
        console.log(`   Role: ${admin.role}`);

        // Test the password matching
        const testUser = await User.findOne({ email: "flitcode.dev@gmail.com" }).select('+password');
        const isMatch = await testUser.matchPassword("99093rrd@45049");
        console.log(`   Password Match Test: ${isMatch ? "✅ SUCCESS" : "❌ FAILED"}`);

        await mongoose.disconnect();
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

resetAdmin();
