const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: ['https://n-d-key-crypt.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Ensure JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Origin:', req.get('Origin'));
  console.log('Headers:', req.headers);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
const cryptoRoutes = require('./routes/cryptoRoutes');
app.use('/api/crypto', cryptoRoutes);

// Fallback route
app.use((req, res) => {
  console.log('Fallback route hit for:', req.url);
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`3DES Encryption API running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('GET /health');
  console.log('GET /api/crypto/algorithms');
  console.log('POST /api/crypto/encrypt');
  console.log('POST /api/crypto/decrypt');
  console.log('CORS enabled for:', corsOptions.origin);
});