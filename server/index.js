const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://n-d-key-crypt.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
const cryptoRoutes = require('./routes/cryptoRoutes');
app.use('/api/crypto', cryptoRoutes);

// Fallback route
app.use((req, res) => {
  console.log('Fallback route hit for:', req.url);
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`3DES Encryption API running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('GET /api/crypto/algorithms');
  console.log('POST /api/crypto/encrypt');
  console.log('POST /api/crypto/decrypt');
});