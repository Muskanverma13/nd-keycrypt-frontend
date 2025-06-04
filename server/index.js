const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://n-d-key-crypt.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Keep your existing cors middleware as well
app.use(cors({
  origin: 'https://n-d-key-crypt.vercel.app',
  credentials: true
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