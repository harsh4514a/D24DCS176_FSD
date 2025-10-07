// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const COUNT_FILE = path.join(__dirname, 'count.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Read count from file
function getCount() {
  if (!fs.existsSync(COUNT_FILE)) {
    fs.writeFileSync(COUNT_FILE, JSON.stringify({ count: 0 }));
  }
  const data = fs.readFileSync(COUNT_FILE, 'utf8');
  return JSON.parse(data).count;
}

// Write count to file
function setCount(newCount) {
  fs.writeFileSync(COUNT_FILE, JSON.stringify({ count: newCount }));
}

// Get current count
app.get('/api/count', (req, res) => {
  res.json({ count: getCount() });
});

// Update count
app.post('/api/count', (req, res) => {
  let { change } = req.body;
  let current = getCount();
  current += change;
  if (current < 0) current = 0;
  setCount(current);
  res.json({ count: current });
});

// Reset count
app.post('/api/reset', (req, res) => {
  setCount(0);
  res.json({ count: 0 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
