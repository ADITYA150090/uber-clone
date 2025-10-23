const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

// Enable CORS first
app.use(cors());

// Parse JSON bodies (must be before routes)


// Parse URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Connect to MongoDB
connectToDb();

// Routes
app.use('/users', userRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;