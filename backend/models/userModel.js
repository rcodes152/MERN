const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        enum: ['Student', 'Others'],
        required: true,
    },
    score: {
        type: Number,
        default: 0, // Initial score
    }
}, { timestamps: true });

// Encrypt password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

























