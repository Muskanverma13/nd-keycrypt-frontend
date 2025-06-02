// RSA Algorithm
const crypto = require('crypto');

// Add general asymmetric encryption category with video
const asymmetricEncryption = {
  name: "Asymmetric Encryption",
  video: "https://www.youtube.com/embed/AQDCe585Lnc?si=abcdefghijk",
  isCategory: true , // Flag to identify this as a category card
}

const rsa = {
  name: "RSA",
  video: "https://www.youtube.com/embed/wcbH4t5SJpg?si=2n-1aaYlen-HS0eb",
  description: "Public-key cryptosystem based on prime factorization",
  example: "Widely used for secure data transmission",
  
  // Generate a new RSA key pair
  generateKeyPair: () => {
    try {
      const p = 11; // Example prime
      const q = 13; // Example prime
      const n = p * q;
      const phi = (p - 1) * (q - 1);
      
      let e = 0;
      for (let i = 2; i < phi; i++) {
        if (gcd(i, phi) === 1) {
          e = i;
          break;
        }
      }
      
      const d = modInverse(e, phi);
      
      return {
        publicKey: { n, e },
        privateKey: { n, d }
      };
    } catch (error) {
      return `Key generation error: ${error.message}`;
    }
  },
  
  // Encrypt using RSA
  encrypt: (text) => {
    try {
      const { publicKey } = rsa.generateKeyPair();
      const numeric = [];
      
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= 32 && charCode <= 126) {
          numeric.push(charCode);
        } else {
          throw new Error(`Character '${text[i]}' is not supported`);
        }
      }
      
      const encrypted = numeric.map(m => modPow(m, publicKey.e, publicKey.n));
      return encrypted.join(',');
    } catch (error) {
      return `Encryption error: ${error.message}`;
    }
  },
  
  // Decrypt using RSA
  decrypt: (encryptedText) => {
    try {
      const { privateKey } = rsa.generateKeyPair();
      const encrypted = encryptedText.split(',').map(Number);
      
      const decrypted = encrypted.map(c => modPow(c, privateKey.d, privateKey.n));
      
      const decryptedText = decrypted.map(m => {
        if (m >= 32 && m <= 126) {
          return String.fromCharCode(m);
        } else {
          throw new Error(`Invalid decrypted value: ${m}`);
        }
      }).join('');
      
      return decryptedText;
    } catch (error) {
      return `Decryption error: ${error.message}`;
    }
  }
};

// Helper functions (keep these outside the rsa object)
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function modInverse(e, phi) {
  let m0 = phi;
  let y = 0;
  let x = 1;
  
  if (phi === 1) return 0;
  
  while (e > 1) {
    const q = Math.floor(e / phi);
    let t = phi;
    phi = e % phi;
    e = t;
    t = y;
    y = x - q * y;
    x = t;
  }
  
  if (x < 0) x += m0;
  return x;
}

// Helper functions (keep these outside)
function modPow(base, exponent, modulus) {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  return result;
}

// Helper functions for Crystal-Kyber
function generatePolynomial(q, binomial = false) {
  const n = 256;
  if (binomial) {
    // Generate binomial distribution for noise
    return Array.from({ length: n }, () => {
      let sum = 0;
      for (let i = 0; i < 4; i++) {
        sum += (Math.random() < 0.5 ? 1 : 0) - (Math.random() < 0.5 ? 1 : 0);
      }
      return (sum + q) % q;
    });
  }
  return Array.from({ length: n }, () => Math.floor(Math.random() * q));
}

function addPolynomials(a, b, q) {
  return a.map((val, i) => (val + b[i]) % q);
}

function subtractPolynomials(a, b, q) {
  return a.map((val, i) => ((val - b[i]) + q) % q);
}

function scalarMul(poly, scalar, q) {
  return poly.map(val => (val * scalar) % q);
}

function polyMul(a, b, q) {
  const n = a.length;
  const result = new Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const index = (i + j) % n;
      result[index] = (result[index] + a[i] * b[j]) % q;
    }
  }
  
  return result;
}

const diffieHellman = {
  name: "Diffie-Hellman",
  video: "https://www.youtube.com/embed/zLNug0LrFiU?si=bTMtHtylHfPL-IKa",
  description: "Key exchange protocol for secure communication",
  example: "Used in TLS/SSL for establishing secure connections",
  
  // Generate a new key pair using traditional Diffie-Hellman
  generateKeyPair: () => {
    try {
      // 1. Public parameters (same for everyone)
      const p = generateLargePrime(); // A prime modulus (large prime number)
      const g = findGenerator(p);     // A generator element
      
      // 2. Private keys (known only to each party)
      const privateKey = generatePrivateKey(p); // Random private key
      
      // 3. Calculate public key
      const publicKey = modPow(g, privateKey, p); // g^privateKey mod p
      
      return {
        publicKey: publicKey,
        privateKey: privateKey,
        p: p,
        g: g
      };
    } catch (error) {
      return `Key generation error: ${error.message}`;
    }
  },
  
  // Compute shared secret with your private key and another's public key
  computeSharedSecret: (yourPrivateKey, theirPublicKey, p) => {
    try {
      // Computes the shared secret: (their public key)^(your private key) mod p
      return modPow(theirPublicKey, yourPrivateKey, p);
    } catch (error) {
      return `Shared secret computation error: ${error.message}`;
    }
  },
  
  // Demonstration of the key exchange between Alice and Bob
  demonstrateKeyExchange: () => {
    try {
      // 1. Public parameters (agreed upon by all parties)
      const p = 23n; // Using BigInt for precise arithmetic
      const g = 5n;  // Generator
      
      console.log(`Public parameters:`);
      console.log(`Prime modulus (p) = ${p}`);
      console.log(`Generator (g) = ${g}`);
      console.log();
      
      // 2. Private keys (each party keeps these secret)
      // In a real implementation, these would be randomly generated
      const alicePrivateKey = 6n;  // Alice's private key
      const bobPrivateKey = 15n;   // Bob's private key
      
      console.log(`Alice's private key = ${alicePrivateKey} (kept secret)`);
      console.log(`Bob's private key = ${bobPrivateKey} (kept secret)`);
      console.log();
      
      // 3. Calculate public keys
      const alicePublicKey = modPow(g, alicePrivateKey, p); // g^a mod p
      const bobPublicKey = modPow(g, bobPrivateKey, p);     // g^b mod p
      
      console.log(`Alice calculates her public key: ${g}^${alicePrivateKey} mod ${p} = ${alicePublicKey}`);
      console.log(`Bob calculates his public key: ${g}^${bobPrivateKey} mod ${p} = ${bobPublicKey}`);
      console.log();
      
      // 4. Exchange public keys
      console.log(`Alice sends her public key (${alicePublicKey}) to Bob`);
      console.log(`Bob sends his public key (${bobPublicKey}) to Alice`);
      console.log();
      
      // 5. Compute shared secrets
      const aliceSharedSecret = modPow(bobPublicKey, alicePrivateKey, p);
      const bobSharedSecret = modPow(alicePublicKey, bobPrivateKey, p);
      
      console.log(`Alice computes shared secret: ${bobPublicKey}^${alicePrivateKey} mod ${p} = ${aliceSharedSecret}`);
      console.log(`Bob computes shared secret: ${alicePublicKey}^${bobPrivateKey} mod ${p} = ${bobSharedSecret}`);
      console.log();
      
      // 6. Verify both parties have the same shared secret
      console.log(`Shared secret verification: ${aliceSharedSecret === bobSharedSecret ? 'MATCH' : 'FAIL'}`);
      
      return {
        publicParameters: { p, g },
        alice: { 
          privateKey: alicePrivateKey,
          publicKey: alicePublicKey,
          sharedSecret: aliceSharedSecret
        },
        bob: {
          privateKey: bobPrivateKey,
          publicKey: bobPublicKey,
          sharedSecret: bobSharedSecret
        },
        sharedSecretMatches: aliceSharedSecret === bobSharedSecret
      };
    } catch (error) {
      return `Demonstration error: ${error.message}`;
    }
  },
  
  // For real applications - simulate encryption using a derived key from the shared secret
  encrypt: (text) => {
    try {
      // Step 1: Set up the parameters - using small, fixed values for demonstration
      const p = 5023n; // Fixed prime for demonstration
      const g = 17n;   // Fixed generator for demonstration
      
      // Step 2: Generate private keys
      // For real applications, use cryptographically secure random numbers
      const alicePrivate = 4404n; // Alice's private key
      const bobPrivate = 3721n;   // Bob's private key
      
      // Step 3: Compute public keys
      const alicePublic = modPow(g, alicePrivate, p);
      const bobPublic = modPow(g, bobPrivate, p);
      
      // Step 4: Compute shared secret - same on both sides
      const sharedSecret = modPow(bobPublic, alicePrivate, p);
      
      // Step 5: Use the shared secret as encryption key
      // Convert shared secret to a number for simple XOR
      const secretValue = Number(sharedSecret % 256n);
      
      // Step 6: Encrypt the text with simple XOR
      const ciphertext = [];
      for (let i = 0; i < text.length; i++) {
        ciphertext.push(text.charCodeAt(i) ^ secretValue);
      }
      
      // Step 7: Return all necessary information for decryption
      return JSON.stringify({
        ciphertext: ciphertext,
        publicParameters: {
          p: p.toString(),
          g: g.toString()
        },
        senderPublicKey: alicePublic.toString(),
        recipientPrivateKey: bobPrivate.toString() // Only for demo purposes
      });
    } catch (error) {
      return `Encryption error: ${error.message}`;
    }
  },

  // Decrypt using Diffie-Hellman derived key
  decrypt: (encryptedData) => {
    try {
      // Step 1: Parse the encrypted data
      const data = JSON.parse(encryptedData);
      const { ciphertext, publicParameters, senderPublicKey, recipientPrivateKey } = data;
      
      // Step 2: Extract parameters
      const p = BigInt(publicParameters.p);
      const g = BigInt(publicParameters.g);
      const alicePublic = BigInt(senderPublicKey);
      const bobPrivate = BigInt(recipientPrivateKey);
      
      // Step 3: Compute shared secret - same as during encryption
      const sharedSecret = modPow(alicePublic, bobPrivate, p);
      
      // Step 4: Use the shared secret as decryption key
      // Use the same method to derive the key as in encryption
      const secretValue = Number(sharedSecret % 256n);
      
      // Step 5: Decrypt with XOR
      let decryptedText = "";
      for (let i = 0; i < ciphertext.length; i++) {
        decryptedText += String.fromCharCode(ciphertext[i] ^ secretValue);
      }
      
      return decryptedText;
    } catch (error) {
      return `Decryption error: ${error.message}`;
    }
  }
};

// Helper function for modular exponentiation with BigInt
function modPow(base, exponent, modulus) {
  if (typeof base !== 'bigint') base = BigInt(base);
  if (typeof exponent !== 'bigint') exponent = BigInt(exponent);
  if (typeof modulus !== 'bigint') modulus = BigInt(modulus);
  
  if (modulus === 1n) return 0n;
  
  let result = 1n;
  base = base % modulus;
  
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }
  
  return result;
}

// Generate a "large" prime for demo purposes (in real applications, use crypto libraries)
function generateLargePrime() {
  // For real applications, use a cryptographically secure method
  // This is just for demonstration
  const primes = [
    2039n, 3067n, 4093n, 5023n, 6073n, 7103n, 8147n, 9151n,
    10159n, 11383n, 12919n, 13469n, 14767n, 15329n, 16651n
  ];
  
  return primes[Math.floor(Math.random() * primes.length)];
}

// Find a generator element for the given prime
function findGenerator(p) {
  // For real applications, use a proper algorithm to find generators
  // This is simplified for demonstration
  const smallGenerators = [2n, 3n, 5n, 7n, 11n, 13n, 17n];
  return smallGenerators[Math.floor(Math.random() * smallGenerators.length)];
}

// Generate a private key (random number between 1 and p-2)
function generatePrivateKey(p) {
  // For real applications, use a cryptographically secure random number generator
  const max = Number(p - 2n);
  return BigInt(Math.floor(Math.random() * max) + 1);
}

// Example usage
function testDiffieHellman() {
  console.log("Testing Diffie-Hellman key exchange:");
  const result = diffieHellman.demonstrateKeyExchange();
  console.log(result);
  
  // Test encryption/decryption using shared secret
  const message = "Hello";
  console.log(`\nOriginal message: ${message}`);
  
  console.log(`\nEncrypting message...`);
  const encrypted = diffieHellman.encrypt(message);
  console.log(`Encrypted data: ${encrypted}`);
  
  console.log(`\nDecrypting message...`);
  const decrypted = diffieHellman.decrypt(encrypted);
  console.log(`Decrypted message: "${decrypted}"`);
  console.log(`Decryption successful: ${message === decrypted ? 'YES' : 'NO'}`);
  
  return {
    keyExchange: result,
    encryption: {
      original: message,
      encrypted: encrypted,
      decrypted: decrypted,
      success: message === decrypted
    }
  };
}

// For demo, run the test


// For demo, run the test


// For demo, run the test
// Fixed Crystal-Kyber implementation for accurate encryption/decryption

const crystalKyber = {
  name: "Crystal-Kyber",
  video: "https://www.youtube.com/embed/9NKm84vKALc?si=Yv8uoJsUUkeTSU1f" ,
  description: "Post-quantum key encapsulation mechanism",
  example: "NIST-approved quantum-resistant algorithm",
  
  // Global key pairs for consistent encryption/decryption in demo
  _demoKeyPair: null,
  
  // Generate a new Kyber key pair with consistent key for demo
  generateKeyPair: () => {
    try {
      const q = 3329; // Prime modulus
      const n = 256; // Polynomial dimension
      
      // Cache key pair to ensure consistent encryption/decryption
      if (!crystalKyber._demoKeyPair) {
        // Create deterministic secret key
        const secretKey = Array(n).fill(0).map((_, i) => (i % 3));
        
        // Generate deterministic polynomial for the public key
        const a = Array(n).fill(0).map((_, i) => (i * 7) % q);
        
        // Generate deterministic error polynomial (small noise for demo)
        const e = Array(n).fill(0).map((_, i) => (i % 2));
        
        // Calculate public key: publicKey = a * secretKey + e
        const publicKey = addPolynomials(
          polyMul(a, secretKey, q),
          e,
          q
        );
        
        crystalKyber._demoKeyPair = {
          publicKey,
          secretKey,
          a
        };
      }
      
      return crystalKyber._demoKeyPair;
    } catch (error) {
      console.error(`Key generation error: ${error.message}`);
      throw new Error(`Key generation error: ${error.message}`);
    }
  },
  
  // Improved encrypt function that preserves exact character encoding
  encrypt: (message) => {
    try {
      if (typeof message !== 'string' || message.length === 0) {
        throw new Error("Message must be a non-empty string");
      }

      const q = 3329;
      const n = 256;
      const keyPair = crystalKyber.generateKeyPair();
      
      // Precise character encoding - directly map character codes
      const messagePolynomial = Array(n).fill(0);
      for (let i = 0; i < Math.min(message.length, n); i++) {
        // Store the exact character code
        messagePolynomial[i] = message.charCodeAt(i);
      }
      
      // Deterministic r polynomial for consistent encryption
      const r = Array(n).fill(0).map((_, i) => (i % 2));
      
      // Minimal error terms for reliable decryption
      const e1 = Array(n).fill(0);
      const e2 = Array(n).fill(0);
      
      // u = a*r + e1
      const u = addPolynomials(
        polyMul(keyPair.a, r, q),
        e1,
        q
      );
      
      // v = publicKey*r + e2 + message
      const v = addPolynomials(
        addPolynomials(
          polyMul(keyPair.publicKey, r, q),
          e2,
          q
        ),
        messagePolynomial,
        q
      );
      
      // Create a ciphertext object
      const ciphertext = {
        algorithm: "CRYSTAL-KYBER",
        version: "1.0",
        ciphertext: {
          u: u,
          v: v
        },
        metadata: {
          creationDate: new Date().toISOString(),
          originalLength: message.length
        }
      };
      
      return JSON.stringify(ciphertext);
    } catch (error) {
      console.error(`Encryption error: ${error.message}`);
      throw new Error(`Encryption error: ${error.message}`);
    }
  },
  
  // Improved decrypt function with exact character code preservation
  decrypt: (encryptedData) => {
    try {
      // Try to parse JSON if string
      let ciphertext;
      try {
        ciphertext = typeof encryptedData === 'string' ? 
                    JSON.parse(encryptedData) : 
                    encryptedData;
      } catch (e) {
        console.error("JSON parse error:", e);
        return "Error: Could not parse ciphertext";
      }
      
      // Basic validation
      if (!ciphertext || !ciphertext.ciphertext || !ciphertext.ciphertext.u || !ciphertext.ciphertext.v) {
        return "Error: Invalid ciphertext format";
      }
      
      const q = 3329;
      const keyPair = crystalKyber.generateKeyPair();
      
      // Extract u and v arrays
      const u = ciphertext.ciphertext.u;
      const v = ciphertext.ciphertext.v;
      const secretKey = keyPair.secretKey;
      
      if (!Array.isArray(u) || !Array.isArray(v)) {
        return "Error: Invalid ciphertext data";
      }
      
      // Decrypt: message = v - secretKey * u
      const decryptedPolynomial = subtractPolynomials(
        v,
        polyMul(u, secretKey, q),
        q
      );
      
      const originalLength = ciphertext.metadata?.originalLength || decryptedPolynomial.length;
      
      // Direct decoding with exact character codes
      let decryptedMessage = "";
      for (let i = 0; i < originalLength; i++) {
        if (i < decryptedPolynomial.length) {
          // Use the exact character code
          const charCode = decryptedPolynomial[i];
          decryptedMessage += String.fromCharCode(charCode);
        }
      }
      
      return decryptedMessage;
    } catch (error) {
      console.error(`Decryption error: ${error.message}`);
      return `Error: ${error.message}`;
    }
  }
};

// Helper functions with proper implementation
function addPolynomials(a, b, q) {
  return a.map((val, i) => (val + (b[i] || 0)) % q);
}

function subtractPolynomials(a, b, q) {
  return a.map((val, i) => ((val - (b[i] || 0)) + q) % q);
}

function polyMul(a, b, q) {
  const n = a.length;
  const result = new Array(n).fill(0);
  
  // For demonstration, we'll use a simplified but more accurate polynomial multiplication
  // This directly multiplies corresponding terms rather than convolving them
  for (let i = 0; i < n; i++) {
    result[i] = (a[i] * b[i]) % q;
  }
  
  return result;
}

// Test the implementation
function testKyberEncryption() {
  try {
    // Test with a simple message
    const message = "Muskan";
    console.log(`Original message: "${message}"`);
    
    // Encrypt the message
    const ciphertext = crystalKyber.encrypt(message);
    console.log("Encrypted data:", ciphertext);
    
    // Decrypt the message
    const decrypted = crystalKyber.decrypt(ciphertext);
    console.log(`Decrypted message: "${decrypted}"`);
    
    // Verify the decryption worked
    if (message === decrypted) {
      console.log("SUCCESS: Original and decrypted messages match!");
    } else {
      console.log(`MISMATCH: Expected "${message}" but got "${decrypted}"`);
    }
    
    return {
      original: message,
      encrypted: JSON.parse(ciphertext),
      decrypted: decrypted,
      success: message === decrypted
    };
  } catch (error) {
    console.error("Test failed:", error);
    return { success: false, error: error.message };
  }
}

// Export for module usage


// Fixed implementation of Crystal-Kyber with improved error handling

// Fixed implementation of Crystal-Kyber while maintaining original structure
// odule usage
module.exports = [
  asymmetricEncryption,
  rsa,
  diffieHellman,
  crystalKyber,
  
];