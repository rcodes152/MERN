const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Moved to the top

const authRoutes = require('./router/auth'); // Adjust the path as necessary
const quizRoutes = require('./router/quiz'); // Require quizRoutes

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const URI = process.env.MONGO_URI;
mongoose.connect(URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes); // Mount the routes under /api/auth
app.use('/api', quizRoutes); // Mount the routes under /api

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
