const express = require('express');
const app = express();
const PORT = 3000;

// Custom middleware to verify working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, from 9 AM to 5 PM).');
  }
};

// Middleware to serve static files (CSS)
app.use(express.static('public'));

// Middleware to check working hours
app.use(checkWorkingHours);

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on' http://localhost:${PORT}`);
});