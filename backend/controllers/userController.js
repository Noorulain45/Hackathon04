const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            subscription: user.subscription,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Activate subscription plan
// @route   POST /api/users/subscription
// @access  Private
const activateSubscription = async (req, res) => {
    const { plan, cardDetails } = req.body;
    
    // Validate card details logic (simplified for hackathon)
    if (!cardDetails || cardDetails.length < 16) {
        return res.status(400).json({ message: 'Invalid card details' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
        // Mock payment logic
        user.subscription = {
            plan: plan,
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            isActive: true,
        };
        // Just storing a mocked/hashed version
        user.cardDetails = {
            last4: cardDetails.slice(-4),
            brand: 'MockCard'
        };

        const updatedUser = await user.save();
        res.json({
            subscription: updatedUser.subscription,
            message: 'Subscription activated successfully'
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
};

// @desc    Update user status block/unblock (Admin only)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.status = user.status === 'blocked' ? 'active' : 'blocked';
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { getUserProfile, activateSubscription, getUsers, updateUserStatus };
