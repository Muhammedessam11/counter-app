const express = require('express');
const app = express();
const PORT = 3030;

let counter = 0;  // In-memory counter

// Middleware to serve static files
app.use(express.static('public'));

// Route to get the current counter value
app.get('/counter', (req, res) => {
  res.json({ counter });
});

// Route to increment the counter
app.post('/increment', (req, res) => {
  counter += 1;
  res.json({ counter });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

