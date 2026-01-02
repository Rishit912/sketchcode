const User = require('../modles/user'); 
const jwt = require('jsonwebtoken');

// Utility function to generate JWT token
const generateToken = (id, role) => {
    const secret = process.env.JWT_KEY;
    if (!secret) {
        throw new Error('JWT_KEY environment variable is not set');
    }
    return jwt.sign({ id, role }, secret, {
        expiresIn: '1d',
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
            // Generate 6-digit PIN
            const pin = Math.floor(100000 + Math.random() * 900000).toString();
            const pinExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
            
            // Store PIN in database
            user.pin = pin;
            user.pinExpiry = pinExpiry;
            await user.save();
            
            console.log(`🔐 PIN generated for ${email}: ${pin}`);
            
            return res.json({
                _id: user._id,
                email: user.email,
                requiresPIN: true,
                message: 'PIN sent to your registered email',
            });
        } else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// @desc    Verify PIN and get token
// @route   POST /api/auth/verify-pin
// @access  Public
exports.verifyPIN = async (req, res) => {
    const { email, pin } = req.body;

    if (!email || !pin) {
        return res.status(400).json({ message: 'Email and PIN are required' });
    }

    try {
        // Find user with PIN
        const user = await User.findOne({ email }).select('+pin +pinExpiry');

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if PIN exists and hasn't expired
        if (!user.pin || !user.pinExpiry || Date.now() > user.pinExpiry) {
            return res.status(400).json({ message: 'PIN expired. Please login again.' });
        }

        // Verify PIN
        if (user.pin !== pin) {
            return res.status(400).json({ message: 'Invalid PIN' });
        }

        // Clear PIN from database
        user.pin = null;
        user.pinExpiry = null;
        await user.save();

        // Generate JWT token
        const token = generateToken(user._id, user.role);
        
        return res.json({
            _id: user._id,
            email: user.email,
            token,
            message: 'Login successful!',
        });
    } catch (error) {
        console.error("PIN verification error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};