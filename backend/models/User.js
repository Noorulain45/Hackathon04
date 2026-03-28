const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    subscription: {
        plan: {
            type: String,
            enum: ['none', 'free_trial', 'basic', 'standard', 'premium'],
            default: 'none',
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: false,
        }
    },
    cardDetails: {
        last4: String, // Just storing last 4 digits for mock UI
        brand: String,
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
