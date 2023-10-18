// Importing required modules
const express = require('express');
const db = require('./db');

// Function to search food
exports.searchFood = async (req, res) => {
  try {
    const { query } = req.params;
    const foodItems = await db.query('SELECT * FROM FoodItems WHERE name LIKE ?', [`%${query}%`]);
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while searching food.' });
  }
};

// Function to log food
exports.logFood = async (req, res) => {
  try {
    const { date, meal_type, food_id, quantity } = req.body;
    const user_id = req.user.id;
    await db.query('INSERT INTO FoodLogs (date, meal_type, food_id, quantity, user_id) VALUES (?, ?, ?, ?, ?)', [date, meal_type, food_id, quantity, user_id]);
    res.json({ message: 'Food logged successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while logging food.' });
  }
};

// Function to get food logs
exports.getFoodLogs = async (req, res) => {
  try {
    const user_id = req.user.id;
    const foodLogs = await db.query('SELECT * FROM FoodLogs WHERE user_id = ?', [user_id]);
    res.json(foodLogs);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while getting food logs.' });
  }
};

// Function to update food log
exports.updateFoodLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, meal_type, food_id, quantity } = req.body;
    const user_id = req.user.id;
    await db.query('UPDATE FoodLogs SET date = ?, meal_type = ?, food_id = ?, quantity = ? WHERE id = ? AND user_id = ?', [date, meal_type, food_id, quantity, id, user_id]);
    res.json({ message: 'Food log updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while updating food log.' });
  }
};

// Function to delete food log
exports.deleteFoodLog = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    await db.query('DELETE FROM FoodLogs WHERE id = ? AND user_id = ?', [id, user_id]);
    res.json({ message: 'Food log deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while deleting food log.' });
  }
};
