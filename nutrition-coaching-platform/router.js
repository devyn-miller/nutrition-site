// Importing required modules
const express = require('express');
const apiController = require('./apiController.js');
const userController = require('./userController.js');
const foodController = require('./foodController.js');

// Creating a router
const router = express.Router();

// API routes
router.get('/api', apiController.getApiInfo);

// User routes
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.loginUser);
router.get('/user/profile', userController.getUserProfile);
router.put('/user/profile', userController.updateUserProfile);

// Food routes
router.get('/food/search', foodController.searchFood);
router.post('/food/log', foodController.logFood);
router.get('/food/logs', foodController.getFoodLogs);
router.put('/food/logs/:id', foodController.updateFoodLog);
router.delete('/food/logs/:id', foodController.deleteFoodLog);

// Exporting the router
module.exports = router;
