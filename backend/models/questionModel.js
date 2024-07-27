const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Communication', 'Marketing'],
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
