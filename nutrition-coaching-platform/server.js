// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Importing routers
const apiRouter = require('./router.js');

// Load environment variables
dotenv.config();

// Creating express app
const app = express();

// Enabling CORS
app.use(cors());

// Parsing JSON bodies
app.use(bodyParser.json());

// Parsing URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Using the router
app.use('/api', apiRouter);

// Setting up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
