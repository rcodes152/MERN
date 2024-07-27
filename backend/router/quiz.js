const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel');
const Assessment = require('../models/assessmentModel');

// Get Random Questions
router.get('/quiz', async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
        res.json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Submit Quiz Answers
router.post('/quiz/submit', async (req, res) => {
    const { userId, answers } = req.body;
    try {
        let score = 0;
        for (let answer of answers) {
            const question = await Question.findById(answer.questionId);
            if (question.correctAnswer === answer.selectedOption) {
                score += 1;
            }
        }
        const percentage = (score / answers.length) * 100;
        const passed = percentage >= 70;
        const assessment = new Assessment({
            user: userId,
            score: percentage,
            passed,
        });
        await assessment.save();
        res.json({ score: percentage, passed });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
