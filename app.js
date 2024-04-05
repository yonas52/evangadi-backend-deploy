require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5500;

// CORS policy
const cors = require('cors');
app.use(cors());

// Database connection
const dbconnection = require('./db/dbConfig');

// Middleware for user routes
const useRoutes = require('./routes/userRoute');

// Middleware for question routes
const questionRoutes = require('./routes/questionRoute');

// Middleware for answer routes
const answerRoutes = require('./routes/answerRoute');

// Middleware for authenticating requests
const authMiddleware = require("./middleware/authMiddleware");

// JSON middleware to extract JSON data
app.use(express.json());

// Handle preflight OPTIONS requests
app.options('*', cors());

// User routes middleware
app.use('/api/users', useRoutes);

// Questions routes middleware
app.use("/api/questions", questionRoutes);

// Answers route middleware
app.use("/api/answers", answerRoutes);

// Start the server
async function start() {
    try {
        // Establish database connection
        await dbconnection.execute("select 'test'");
        
        // Start listening on the specified port
        app.listen(port, () => {
            console.log('Database connection established');
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
    }
}

start();
