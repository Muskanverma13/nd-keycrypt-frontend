const express = require('express');
const router = express.Router();
const algorithms = require('../algorithms');

// Middleware for logging all requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// GET all algorithms
router.get('/algorithms', (req, res) => {
  console.log('Algorithms route hit');
  try {
    const symmetricAlgos = algorithms.symmetricAlgorithms.map(a => {
      console.log(`Processing sym algo: ${a.name}`);
      return {
        name: a.name,
        description: a.description,
        example: a.example,
        video: a.video,
        isCategory: a.isCategory // Added this line
      };
    });
    
    const asymmetricAlgos = algorithms.asymmetricAlgorithms.map(a => {
      console.log(`Processing asym algo: ${a.name}`);
      return {
        name: a.name,
        description: a.description,
        example: a.example,
        video: a.video,
        isCategory: a.isCategory // Added this line
      };
    });
    
    console.log('Processed symmetric algorithms:', symmetricAlgos.map(a => a.name));
    
    res.json({
      symmetric: symmetricAlgos,
      asymmetric: asymmetricAlgos
    });
  } catch (error) {
    console.error('Algorithm fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to load algorithms',
      details: error.message
    });
  }
});

// Rest of your code remains the same...

// Encrypt endpoint
router.post('/encrypt', (req, res) => {
  const { text, algorithm, type, key } = req.body;
  
  try {
    if (!text || !algorithm || !type) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['text', 'algorithm', 'type']
      });
    }

    const algo = algorithms.getAlgorithmByName(algorithm, type);
    if (!algo) {
      return res.status(404).json({ 
        error: 'Algorithm not found',
        availableAlgorithms: {
          symmetric: algorithms.symmetricAlgorithms.map(a => a.name),
          asymmetric: algorithms.asymmetricAlgorithms.map(a => a.name)
        }
      });
    }
    
    const result = algo.encrypt(text, key);
    console.log(`Encryption successful: ${algorithm}`);
    
    // Special handling for 3DES response
    const encrypted = typeof result === 'string' ? result : JSON.stringify(result);
    
    res.json({ 
      original: text,
      encrypted: encrypted,
      algorithm: algorithm,
      type: type
    });
    
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ 
      error: 'Encryption failed',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Decrypt endpoint
router.post('/decrypt', (req, res) => {
  const { text, algorithm, type, key } = req.body;
  
  try {
    if (!text || !algorithm || !type) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['text', 'algorithm', 'type']
      });
    }

    const algo = algorithms.getAlgorithmByName(algorithm, type);
    if (!algo) {
      return res.status(404).json({ 
        error: 'Algorithm not found',
        availableAlgorithms: {
          symmetric: algorithms.symmetricAlgorithms.map(a => a.name),
          asymmetric: algorithms.asymmetricAlgorithms.map(a => a.name)
        }
      });
    }
    
    const result = algo.decrypt(text, key);
    console.log(`Decryption successful: ${algorithm}`);
    res.json({ 
      encrypted: text,
      decrypted: result,
      algorithm: algorithm,
      type: type
    });
    
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ 
      error: 'Decryption failed',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;