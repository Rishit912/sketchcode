const User = require('../modles/user'); 
const jwt = require('jsonwebtoken');

// Utility function to generate JWT token - FIX: Include user role
const generateToken = (id, role) => {
    // Uses JWT_KEY from process.env
    return jwt.sign({ id, role }, process.env.JWT_KEY || 'your_fallback_secret', { // ADDED ROLE HERE
        expiresIn: '1d', // 1 day expiration
    });
};

// @desc    Register a new user (Admin creation)
// @route   POST /api/auth/register
// @access  Public (Used once for setup)
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        // Create user, password hashes automatically via pre-save hook
        const user = await User.create({ email, password, role: 'admin' });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                email: user.email,
                // FIX: Pass user.role to generateToken
                token: generateToken(user._id, user.role),
                message: 'User registered successfully.'
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Must explicitly select password because it's set to select: false in model
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            // FIX: Must explicitly select role here since it's not selected by default
            const userWithRole = await User.findOne({ email });
            if (!userWithRole) return res.status(500).json({ message: "User data fetch error" });
            
            return res.json({
                _id: userWithRole._id,
                email: userWithRole.email,
                // FIX: Pass userWithRole.role to generateToken
                token: generateToken(userWithRole._id, userWithRole.role),
            });
        } else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};