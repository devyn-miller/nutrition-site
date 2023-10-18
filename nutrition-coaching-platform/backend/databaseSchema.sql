-- Database schema for Nutrition Coaching and Tracking Platform

-- Users table
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    goal VARCHAR(255),
    diet_type VARCHAR(255),
    metabolism_rate FLOAT
);

-- Food items table
CREATE TABLE FoodItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    calories INT,
    protein FLOAT,
    carbs FLOAT,
    fat FLOAT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- User's food logs table
CREATE TABLE FoodLogs (
    id INT PRIMARY_KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    meal_type VARCHAR(255),
    food_id INT,
    quantity INT,
    user_id INT,
    FOREIGN KEY (food_id) REFERENCES FoodItems(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- User's biometric data table
CREATE TABLE BiometricData (
    id INT PRIMARY_KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    weight FLOAT,
    blood_pressure VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- User's progress photos table
CREATE TABLE ProgressPhotos (
    id INT PRIMARY_KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    photo_url VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- User's recipes table
CREATE TABLE Recipes (
    id INT PRIMARY_KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT,
    preparation TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
