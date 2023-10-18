// Importing required modules
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// USDA FoodData Central API URL
const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

// USDA API Key
const USDA_API_KEY = process.env.USDA_API_KEY;

// Function to get API info
exports.getApiInfo = (req, res) => {
  res.json({
    name: 'Nutrition Coaching and Tracking Platform API',
    version: '1.0.0',
    description: 'API for a comprehensive nutrition coaching and tracking platform.',
  });
};

// Function to search food in USDA database
exports.searchFoodInUSDA = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await axios.get(`${USDA_API_URL}?api_key=${USDA_API_KEY}&query=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while searching food in USDA database.' });
  }
};
