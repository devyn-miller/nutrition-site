// Importing required modules
const express = require('express');
const path = require('path');

// Importing the server
const app = require('../server.js');

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Handling all get requests to the server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
