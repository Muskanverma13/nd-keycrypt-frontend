const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// Allowed origins (local + deployed)
const allowedOrigins = [
  'http://localhost:5173',
  'https://n-d-key-crypt-git-master-muskanverma0213gmailcoms-projects.vercel.app'
];

// Manual CORS headers (for OPTIONS preflight & older clients)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// CORS middleware (dynamic origin check)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// JSON parser middleware
app.use(express.json());

// Debug logs for incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
const cryptoRoutes = require('./routes/cryptoRoutes');
app.use('/api/crypto', cryptoRoutes);

// Fallback route for undefined endpoints
app.use((req, res) => {
  console.log('Fallback route hit for:', req.url);
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`3DES Encryption API running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('GET /api/crypto/algorithms');
  console.log('POST /api/crypto/encrypt');
  console.log('POST /api/crypto/decrypt');
});
