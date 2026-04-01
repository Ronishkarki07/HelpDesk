const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
