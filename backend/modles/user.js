const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, 
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false, // Prevents password from being returned in standard queries
  },
  role: { 
    type: String,
    enum: ['user', 'admin'],
    default: 'admin',
  },
}, {
    timestamps: true
});

// Middleware to hash password BEFORE saving
userSchema.pre('save', async function (next) {
    // Only run this function if password was modified
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Compare plain-text enteredPassword with hashed this.password
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", userSchema);
module.exports = User;
