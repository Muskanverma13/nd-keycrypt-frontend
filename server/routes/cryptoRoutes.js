const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Middleware for logging all requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Try to import algorithms, fallback to built-in if not available
let algorithms;
try {
  algorithms = require('../algorithms');
  console.log('Successfully loaded external algorithms module');
} catch (error) {
  console.log('External algorithms module not found, using built-in algorithms');
  
  // Built-in algorithms as fallback
  algorithms = {
    symmetricAlgorithms: [
      {
        name: "3DES",
        description: "Triple Data Encryption Standard - applies DES cipher algorithm three times to each data block",
        example: "Encrypt 'Hello World' with key 'mykey123' → encrypted output",
        video: "https://example.com/3des-video",
        isCategory: false,
        encrypt: (text, key) => {
          try {
            const cipher = crypto.createCipher('des-ede3', key || 'defaultkey');
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
          } catch (error) {
            throw new Error(`3DES encryption failed: ${error.message}`);
          }
        },
        decrypt: (encryptedText, key) => {
          try {
            const decipher = crypto.createDecipher('des-ede3', key || 'defaultkey');
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
          } catch (error) {
            throw new Error(`3DES decryption failed: ${error.message}`);
          }
        }
      },
      {
        name: "AES",
        description: "Advanced Encryption Standard - symmetric encryption algorithm",
        example: "Encrypt 'Hello World' with key 'mykey123456789012345678901234' → encrypted output",
        video: "https://example.com/aes-video",
        isCategory: false,
        encrypt: (text, key) => {
          try {
            const cipher = crypto.createCipher('aes-256-cbc', key || 'defaultkey123456789012345678901234');
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
          } catch (error) {
            throw new Error(`AES encryption failed: ${error.message}`);
          }
        },
        decrypt: (encryptedText, key) => {
          try {
            const decipher = crypto.createDecipher('aes-256-cbc', key || 'defaultkey123456789012345678901234');
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
          } catch (error) {
            throw new Error(`AES decryption failed: ${error.message}`);
          }
        }
      }
    ],
    asymmetricAlgorithms: [
      {
        name: "RSA",
        description: "Rivest-Shamir-Adleman - public-key cryptosystem",
        example: "Generate key pair, encrypt with public key, decrypt with private key",
        video: "https://example.com/rsa-video",
        isCategory: false,
        encrypt: (text, key) => {
          try {
            // For demo purposes - in real implementation, you'd use proper RSA
            return Buffer.from(text).toString('base64') + '_RSA_ENCRYPTED';
          } catch (error) {
            throw new Error(`RSA encryption failed: ${error.message}`);
          }
        },
        decrypt: (encryptedText, key) => {
          try {
            // For demo purposes - in real implementation, you'd use proper RSA
            if (encryptedText.endsWith('_RSA_ENCRYPTED')) {
              const base64Text = encryptedText.replace('_RSA_ENCRYPTED', '');
              return Buffer.from(base64Text, 'base64').toString('utf8');
            }
            throw new Error('Invalid RSA encrypted text format');
          } catch (error) {
            throw new Error(`RSA decryption failed: ${error.message}`);
          }
        }
      }
    ],
    getAlgorithmByName: function(name, type) {
      const algoList = type === 'symmetric' ? this.symmetricAlgorithms : this.asymmetricAlgorithms;
      return algoList.find(algo => algo.name.toLowerCase() === name.toLowerCase());
    }
  };
}

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
        isCategory: a.isCategory || false
      };
    });
    
    const asymmetricAlgos = algorithms.asymmetricAlgorithms.map(a => {
      console.log(`Processing asym algo: ${a.name}`);
      return {
        name: a.name,
        description: a.description,
        example: a.example,
        video: a.video,
        isCategory: a.isCategory || false
      };
    });
    
    console.log('Processed symmetric algorithms:', symmetricAlgos.map(a => a.name));
    console.log('Processed asymmetric algorithms:', asymmetricAlgos.map(a => a.name));
    
    res.json({
      success: true,
      symmetric: symmetricAlgos,
      asymmetric: asymmetricAlgos,
      message: 'Algorithms loaded successfully'
    });
  } catch (error) {
    console.error('Algorithm fetch error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to load algorithms',
      details: error.message
    });
  }
});

// Encrypt endpoint
router.post('/encrypt', (req, res) => {
  const { text, algorithm, type, key } = req.body;
  
  console.log('Encrypt request received:', { text: text ? '[PROVIDED]' : '[MISSING]', algorithm, type, key: key ? '[PROVIDED]' : '[MISSING]' });
  
  try {
    if (!text || !algorithm || !type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['text', 'algorithm', 'type'],
        received: { text: !!text, algorithm: !!algorithm, type: !!type }
      });
    }

    const algo = algorithms.getAlgorithmByName(algorithm, type);
    if (!algo) {
      return res.status(404).json({ 
        success: false,
        error: 'Algorithm not found',
        requested: { algorithm, type },
        availableAlgorithms: {
          symmetric: algorithms.symmetricAlgorithms.map(a => a.name),
          asymmetric: algorithms.asymmetricAlgorithms.map(a => a.name)
        }
      });
    }
    
    const result = algo.encrypt(text, key);
    console.log(`Encryption successful: ${algorithm}`);
    
    // Special handling for different result types
    const encrypted = typeof result === 'string' ? result : JSON.stringify(result);
    
    res.json({ 
      success: true,
      original: text,
      encrypted: encrypted,
      algorithm: algorithm,
      type: type,
      message: 'Encryption completed successfully'
    });
    
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Encryption failed',
      details: error.message,
      algorithm: algorithm,
      type: type,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Decrypt endpoint
router.post('/decrypt', (req, res) => {
  const { text, algorithm, type, key } = req.body;
  
  console.log('Decrypt request received:', { text: text ? '[PROVIDED]' : '[MISSING]', algorithm, type, key: key ? '[PROVIDED]' : '[MISSING]' });
  
  try {
    if (!text || !algorithm || !type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['text', 'algorithm', 'type'],
        received: { text: !!text, algorithm: !!algorithm, type: !!type }
      });
    }

    const algo = algorithms.getAlgorithmByName(algorithm, type);
    if (!algo) {
      return res.status(404).json({ 
        success: false,
        error: 'Algorithm not found',
        requested: { algorithm, type },
        availableAlgorithms: {
          symmetric: algorithms.symmetricAlgorithms.map(a => a.name),
          asymmetric: algorithms.asymmetricAlgorithms.map(a => a.name)
        }
      });
    }
    
    const result = algo.decrypt(text, key);
    console.log(`Decryption successful: ${algorithm}`);
    
    res.json({ 
      success: true,
      encrypted: text,
      decrypted: result,
      algorithm: algorithm,
      type: type,
      message: 'Decryption completed successfully'
    });
    
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Decryption failed',
      details: error.message,
      algorithm: algorithm,
      type: type,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Test endpoint for debugging
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Crypto routes are working!',
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      'GET /api/crypto/algorithms',
      'POST /api/crypto/encrypt',
      'POST /api/crypto/decrypt',
      'GET /api/crypto/test'
    ]
  });
});

module.exports = router;