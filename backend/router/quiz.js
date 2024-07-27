const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/questionModel');
const Assessment = require('../models/assessmentModel');
const User = require('../models/userModel'); // Assuming you have a User model

// Get Random Questions
router.get('/quiz', async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
        res.json(questions);
    } catch (err) {
        console.error('Error fetching questions:', err.message);
        res.status(500).send('Server error');
    }
});

// Submit Quiz Answers
router.post('/quiz/submit', async (req, res) => {
    const { userId, answers } = req.body;
    if (!userId || !answers) {
        return res.status(400).json({ message: 'User ID and answers are required.' });
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let score = 0;
        const totalQuestions = answers.length;
        
        for (let answer of answers) {
            const question = await Question.findById(answer.questionId).session(session);
            if (!question) {
                console.warn(`Question with ID ${answer.questionId} not found.`);
                continue;
            }
            if (question.correctAnswer === answer.selectedOption) {
                score += 1;
            }
        }

        const percentage = (score / totalQuestions) * 100;
        const passed = percentage >= 70;
        
        const assessment = new Assessment({
            user: userId,
            score: percentage,
            passed,
        });
        await assessment.save({ session });

        // Update the user's score
        await User.findByIdAndUpdate(userId, { score: percentage }, { session });

        await session.commitTransaction();
        session.endSession();

        res.json({ score: percentage, passed });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error submitting quiz answers:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
