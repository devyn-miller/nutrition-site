// Importing required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Importing the database connection
const db = require('./db');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Function to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserting the new user into the database
    const result = await db.query('INSERT INTO Users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while registering the user.' });
  }
};

// Function to login a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetching the user from the database
    const [user] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);

    // Checking if the user exists and the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      // Generating a JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'User logged in successfully.', token });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while logging in the user.' });
  }
};

// Function to get a user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;

    // Fetching the user's profile from the database
    const [user] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while fetching the user\'s profile.' });
  }
};

// Function to update a user's profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { goal, diet_type, metabolism_rate } = req.body;

    // Updating the user's profile in the database
    await db.query('UPDATE Users SET goal = ?, diet_type = ?, metabolism_rate = ? WHERE id = ?', [goal, diet_type, metabolism_rate, id]);

    res.json({ message: 'User\'s profile updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while updating the user\'s profile.' });
  }
};
