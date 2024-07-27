const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    passed: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

const Assessment = mongoose.model('Assessment', assessmentSchema);
module.exports = Assessment;
