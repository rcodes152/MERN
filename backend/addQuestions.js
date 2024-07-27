const mongoose = require('mongoose');
const Question = require('./models/questionModel'); // Adjust the path if necessary
require('dotenv').config();

// MongoDB connection
const URI = process.env.MONGO_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const questions = [
    {
        category: 'Communication',
        questionText: 'What is active listening?',
        options: ['Hearing someone speak', 'Listening attentively and responding appropriately', 'Ignoring someone', 'Talking over someone'],
        correctAnswer: 'Listening attentively and responding appropriately'
    },
    {
        category: 'Communication',
        questionText: 'Which of the following is a barrier to effective communication?',
        options: ['Active listening', 'Clear message', 'Noise', 'Feedback'],
        correctAnswer: 'Noise'
    },
    {
        category: 'Marketing',
        questionText: 'What is the primary goal of marketing?',
        options: ['Selling products', 'Creating value for customers', 'Increasing costs', 'Improving quality'],
        correctAnswer: 'Creating value for customers'
    },
    {
        category: 'Marketing',
        questionText: 'Which of these is a part of the marketing mix?',
        options: ['Product', 'Production', 'Profit', 'Publicity'],
        correctAnswer: 'Product'
    },
    // Add more questions here
    {
        category: 'Communication',
        questionText: 'What is nonverbal communication?',
        options: ['Communication using words', 'Communication using body language and gestures', 'Communication using emails', 'Communication using phone calls'],
        correctAnswer: 'Communication using body language and gestures'
    },
    {
        category: 'Communication',
        questionText: 'Which of these is an example of effective communication?',
        options: ['Clear and concise message', 'Rambling and unclear message', 'Monotonous speaking', 'Ignoring feedback'],
        correctAnswer: 'Clear and concise message'
    },
    {
        category: 'Marketing',
        questionText: 'What is market segmentation?',
        options: ['Dividing the market into distinct groups', 'Combining different markets', 'Ignoring market differences', 'Increasing product prices'],
        correctAnswer: 'Dividing the market into distinct groups'
    },
    {
        category: 'Marketing',
        questionText: 'Which of the following is a marketing strategy?',
        options: ['Market penetration', 'Market rejection', 'Market avoidance', 'Market exclusion'],
        correctAnswer: 'Market penetration'
    },
    {
        category: 'Communication',
        questionText: 'What is the purpose of feedback in communication?',
        options: ['To ignore the message', 'To clarify the message', 'To talk over the speaker', 'To disrupt the conversation'],
        correctAnswer: 'To clarify the message'
    },
    {
        category: 'Communication',
        questionText: 'Which of these is a form of written communication?',
        options: ['Email', 'Gestures', 'Eye contact', 'Tone of voice'],
        correctAnswer: 'Email'
    },
    {
        category: 'Marketing',
        questionText: 'What does SWOT analysis stand for?',
        options: ['Strengths, Weaknesses, Opportunities, Threats', 'Sales, Weaknesses, Opportunities, Trends', 'Strengths, Work, Opportunities, Tasks', 'Sales, Work, Opportunities, Threats'],
        correctAnswer: 'Strengths, Weaknesses, Opportunities, Threats'
    },
    {
        category: 'Marketing',
        questionText: 'What is a target market?',
        options: ['The entire market', 'A specific group of consumers', 'A market with no competition', 'A market that is not profitable'],
        correctAnswer: 'A specific group of consumers'
    },
    {
        category: 'Communication',
        questionText: 'What is the role of tone in communication?',
        options: ['It affects the message delivery', 'It is irrelevant to communication', 'It confuses the message', 'It is the same as the message content'],
        correctAnswer: 'It affects the message delivery'
    },
    {
        category: 'Communication',
        questionText: 'Which of these is a technique to improve communication?',
        options: ['Interrupting frequently', 'Active listening', 'Talking continuously', 'Ignoring feedback'],
        correctAnswer: 'Active listening'
    },
    {
        category: 'Marketing',
        questionText: 'What is a brand?',
        options: ['A product category', 'A unique identity for a product or service', 'A marketing strategy', 'A pricing model'],
        correctAnswer: 'A unique identity for a product or service'
    },
    {
        category: 'Marketing',
        questionText: 'What is the purpose of a marketing campaign?',
        options: ['To increase brand awareness', 'To decrease product quality', 'To avoid customer interaction', 'To reduce market share'],
        correctAnswer: 'To increase brand awareness'
    },
    {
        category: 'Communication',
        questionText: 'What is the impact of poor communication?',
        options: ['Improved relationships', 'Misunderstandings and conflicts', 'Increased productivity', 'Clear messages'],
        correctAnswer: 'Misunderstandings and conflicts'
    },
    {
        category: 'Communication',
        questionText: 'Which of these is a visual aid in communication?',
        options: ['PowerPoint presentation', 'Tone of voice', 'Body language', 'Telephone call'],
        correctAnswer: 'PowerPoint presentation'
    },
    {
        category: 'Marketing',
        questionText: 'What is consumer behavior?',
        options: ['The study of how individuals make purchasing decisions', 'The process of producing goods', 'The strategy to reduce costs', 'The method of setting prices'],
        correctAnswer: 'The study of how individuals make purchasing decisions'
    },
    {
        category: 'Marketing',
        questionText: 'What is digital marketing?',
        options: ['Marketing using digital technologies', 'Traditional marketing methods', 'Marketing without using the internet', 'Marketing to a local audience only'],
        correctAnswer: 'Marketing using digital technologies'
    }
];

async function insertQuestions() {
    try {
        await Question.insertMany(questions);
        console.log('Questions inserted successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
}

insertQuestions();
