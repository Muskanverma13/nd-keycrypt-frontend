import React, { useState, useEffect } from 'react';

const RSACipherComponent = () => {
  const [code, setCode] = useState(`// RSA Cipher implementation

// Check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

// Calculate GCD using Euclidean algorithm
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Extended Euclidean Algorithm for modular multiplicative inverse
function modInverse(e, phi) {
  let m0 = phi;
  let y = 0;
  let x = 1;
  
  if (phi === 1) return 0;
  
  while (e > 1) {
    // q is quotient
    const q = Math.floor(e / phi);
    let t = phi;
    
    // phi is remainder now
    phi = e % phi;
    e = t;
    t = y;
    
    // Update x and y
    y = x - q * y;
    x = t;
  }
  
  // Make x positive
  if (x < 0) x += m0;
  return x;
}

// Modular exponentiation for large numbers
function modPow(base, exponent, modulus) {
  if (modulus === 1) return 0;
  
  let result = 1;
  base = base % modulus;
  
  while (exponent > 0) {
    // If exponent is odd, multiply base with result
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    
    // Exponent must be even now
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  
  return result;
}

// Generate RSA key pair
function generateRSAKeys(p, q) {
  // Validate primes
  if (!isPrime(p) || !isPrime(q)) {
    throw new Error("Both p and q must be prime numbers");
  }
  
  // Calculate n = p * q
  const n = p * q;
  
  // Calculate Euler's totient function: φ(n) = (p-1)(q-1)
  const phi = (p - 1) * (q - 1);
  
  // Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
  let e = 0;
  for (let i = 2; i < phi; i++) {
    if (gcd(i, phi) === 1) {
      e = i;
      break;
    }
  }
  
  // Calculate d such that (d * e) % phi = 1
  const d = modInverse(e, phi);
  
  return {
    publicKey: { n, e },
    privateKey: { n, d }
  };
}

// Encrypt using RSA
function rsaEncrypt(message, publicKey) {
  // Convert message to numeric values
  const numeric = [];
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    if (charCode >= 32 && charCode <= 126) {
      numeric.push(charCode);
    } else {
      throw new Error(\`Character '\${message[i]}' is not supported\`);
    }
  }
  
  // Encrypt each value: C = M^e mod n
  const encrypted = numeric.map(m => modPow(m, publicKey.e, publicKey.n));
  return encrypted.join(',');
}

// Decrypt using RSA
function rsaDecrypt(ciphertext, privateKey) {
  // Split the comma-separated encrypted numbers
  const encrypted = ciphertext.split(',').map(Number);
  
  // Decrypt each number: M = C^d mod n
  const decrypted = encrypted.map(c => modPow(c, privateKey.d, privateKey.n));
  
  // Convert back to characters
  const decryptedText = decrypted.map(m => {
    if (m >= 32 && m <= 126) {
      return String.fromCharCode(m);
    } else {
      throw new Error(\`Invalid decrypted value: \${m}\`);
    }
  }).join('');
  
  return decryptedText;
}

// Example usage
const p = 11;
const q = 13;
const keys = generateRSAKeys(p, q);

console.log("Key Generation:");
console.log("p =", p, "q =", q);
console.log("n =", keys.publicKey.n);
console.log("Public exponent (e) =", keys.publicKey.e);
console.log("Private exponent (d) =", keys.privateKey.d);

const message = "HELLO";
console.log("\\nOriginal message:", message);

const encrypted = rsaEncrypt(message, keys.publicKey);
console.log("Encrypted (comma-separated values):", encrypted);

const decrypted = rsaDecrypt(encrypted, keys.privateKey);
console.log("Decrypted:", decrypted);`);

  const [publicKey, setPublicKey] = useState({ n: 143, e: 7 });
  const [privateKey, setPrivateKey] = useState({ n: 143, d: 103 });
  const [p, setP] = useState(11);
  const [q, setQ] = useState(13);
  const [input, setInput] = useState('HELLO');
  const [output, setOutput] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [stepByStep, setStepByStep] = useState([]);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState([]);

  // Function to run the user's code safely
  const runCode = () => {
    try {
      // Clear previous console output
      const logs = [];
      const originalConsoleLog = console.log;
      
      // Override console.log to capture output
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalConsoleLog(...args);
      };
      
      // Execute the code
      eval(code);
      
      // Restore console.log
      console.log = originalConsoleLog;
      
      // Update console output
      setConsoleOutput(logs);
    } catch (error) {
      setConsoleOutput([`Error: ${error.message}`]);
    }
  };

  // Check if a number is prime
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  };

  // Calculate GCD using Euclidean algorithm
  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Extended Euclidean Algorithm to find modular multiplicative inverse
  const modInverse = (e, phi) => {
    let m0 = phi;
    let y = 0;
    let x = 1;
    
    if (phi === 1) return 0;
    
    while (e > 1) {
      // q is quotient
      const q = Math.floor(e / phi);
      let t = phi;
      
      // phi is remainder now
      phi = e % phi;
      e = t;
      t = y;
      
      // Update x and y
      y = x - q * y;
      x = t;
    }
    
    // Make x positive
    if (x < 0) x += m0;
    
    return x;
  };

  // Modular exponentiation for large numbers
  const modPow = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
      // If exponent is odd, multiply base with result
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      
      // Exponent must be even now
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    
    return result;
  };

  // Generate RSA key pair
  const generateKeys = () => {
    try {
      // Validate that p and q are prime
      if (!isPrime(p) || !isPrime(q)) {
        setError('Both p and q must be prime numbers');
        return;
      }
      
      // Calculate n = p * q
      const n = p * q;
      
      // Calculate Euler's totient function: φ(n) = (p-1)(q-1)
      const phi = (p - 1) * (q - 1);
      
      // Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
      let e = 0;
      for (let i = 2; i < phi; i++) {
        if (gcd(i, phi) === 1) {
          e = i;
          break;
        }
      }
      
      // Calculate d such that (d * e) % phi = 1
      const d = modInverse(e, phi);
      
      // Public key is (n, e) and private key is (n, d)
      setPublicKey({ n, e });
      setPrivateKey({ n, d });
      setError('');
      
      return { publicKey: { n, e }, privateKey: { n, d } };
    } catch (err) {
      setError(`Key generation error: ${err.message}`);
      return null;
    }
  };

  // Encrypt function
  const encrypt = (text, key) => {
    try {
      // Convert text to numbers (A=0, B=1, etc.)
      const numeric = [];
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        
        // Handle ASCII for uppercase letters, lowercase letters, numbers, and basic punctuation
        if (charCode >= 32 && charCode <= 126) {
          numeric.push(charCode);
        } else {
          throw new Error(`Character '${text[i]}' is not supported`);
        }
      }
      
      // Encrypt each number using RSA: C = M^e mod n
      const encrypted = numeric.map(m => {
        const c = modPow(m, key.e, key.n);
        return c;
      });
      
      setStepByStep(numeric.map((m, index) => ({
        original: text[index],
        numeric: m,
        calculation: `${m}^${key.e} mod ${key.n}`,
        result: encrypted[index]
      })));
      
      return encrypted.join(',');
    } catch (err) {
      setError(`Encryption error: ${err.message}`);
      return '';
    }
  };

  // Decrypt function
  const decrypt = (ciphertext, key) => {
    try {
      // Split the comma-separated encrypted numbers
      const encrypted = ciphertext.split(',').map(Number);
      
      // Decrypt each number using RSA: M = C^d mod n
      const decrypted = encrypted.map(c => {
        const m = modPow(c, key.d, key.n);
        return m;
      });
      
      // Convert numbers back to characters
      const decryptedText = decrypted.map(m => {
        // Ensure the character code is valid
        if (m >= 32 && m <= 126) {
          return String.fromCharCode(m);
        } else {
          throw new Error(`Invalid decrypted value: ${m}`);
        }
      }).join('');
      
      setStepByStep(encrypted.map((c, index) => ({
        encrypted: c,
        calculation: `${c}^${key.d} mod ${key.n}`,
        numeric: decrypted[index],
        result: decrypted[index] ? String.fromCharCode(decrypted[index]) : ''
      })));
      
      return decryptedText;
    } catch (err) {
      setError(`Decryption error: ${err.message}`);
      return '';
    }
  };

  // Process text whenever input or keys change
  useEffect(() => {
    if (p && q) {
      generateKeys();
    }
  }, [p, q]);

  useEffect(() => {
    if (isEncrypting) {
      const encryptedOutput = encrypt(input, publicKey);
      setOutput(encryptedOutput);
      // Also test decryption to ensure it works
      const testDecryption = decrypt(encryptedOutput, privateKey);
      setDecrypted(testDecryption);
    } else {
      try {
        const decryptedOutput = decrypt(input, privateKey);
        setOutput(decryptedOutput);
        setDecrypted('');
      } catch (err) {
        setError(`Please enter valid encrypted numbers separated by commas`);
      }
    }
  }, [input, publicKey, privateKey, isEncrypting]);

  // Show step-by-step explanation based on activeStep
  const stepExplanation = () => {
    const encryptSteps = [
      "1. Convert each character to its ASCII value (M)",
      "2. Apply the encryption formula: C = M^e mod n for each value",
      "3. Join the encrypted values with commas to create the ciphertext"
    ];
    
    const decryptSteps = [
      "1. Split the ciphertext string by commas to get individual encrypted values (C)",
      "2. Apply the decryption formula: M = C^d mod n for each value",
      "3. Convert each decrypted number back to its ASCII character"
    ];
    
    return isEncrypting ? encryptSteps[activeStep] : decryptSteps[activeStep];
  };

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">RSA Cipher Implementation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
          <div className="bg-neutral-700 px-4 py-2 flex justify-between items-center">
            <h3 className="font-medium">Code Editor</h3>
            <button 
              onClick={runCode}
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-md text-sm font-medium transition-colors"
            >
              Run Code
            </button>
          </div>
          <textarea
            className="w-full h-96 bg-neutral-800 text-neutral-100 p-4 font-mono text-sm focus:outline-none resize-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col h-full">
          {/* Key Generation Panel */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">Key Generation</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Prime p</label>
                <input
                  type="number"
                  value={p}
                  onChange={(e) => setP(parseInt(e.target.value) || 0)}
                  className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                  min="2"
                />
                {p > 0 && !isPrime(p) && 
                  <p className="text-red-500 text-xs mt-1">Must be a prime number</p>
                }
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Prime q</label>
                <input
                  type="number"
                  value={q}
                  onChange={(e) => setQ(parseInt(e.target.value) || 0)}
                  className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                  min="2"
                />
                {q > 0 && !isPrime(q) && 
                  <p className="text-red-500 text-xs mt-1">Must be a prime number</p>
                }
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Public Key (n, e)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={publicKey.n}
                    readOnly
                    className="w-1/2 bg-neutral-700 text-neutral-100 p-2 rounded-md"
                  />
                  <input
                    type="number"
                    value={publicKey.e}
                    readOnly
                    className="w-1/2 bg-neutral-700 text-neutral-100 p-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Private Key (n, d)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={privateKey.n}
                    readOnly
                    className="w-1/2 bg-neutral-700 text-neutral-100 p-2 rounded-md"
                  />
                  <input
                    type="number"
                    value={privateKey.d}
                    readOnly
                    className="w-1/2 bg-neutral-700 text-neutral-100 p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={generateKeys}
              className="bg-orange-500 hover:bg-orange-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Generate New Keys
            </button>
          </div>
          
          {/* Encryption/Decryption Panel */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">Encryption / Decryption</h3>
            
            <div className="mb-4">
              <label className="block text-sm text-neutral-400 mb-1">Mode</label>
              <div className="flex space-x-4">
                <button 
                  className={`px-4 py-2 rounded-md ${isEncrypting ? 'bg-orange-500 text-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  onClick={() => setIsEncrypting(true)}
                >
                  Encrypt
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${!isEncrypting ? 'bg-orange-500 text-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  onClick={() => setIsEncrypting(false)}
                >
                  Decrypt
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-neutral-400 mb-1">
                {isEncrypting ? 'Input Text' : 'Encrypted Values (comma-separated)'}
              </label>
              <textarea
                className="w-full h-20 bg-neutral-700 text-neutral-100 p-2 rounded-md resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isEncrypting ? "Enter text to encrypt" : "Enter comma-separated values to decrypt"}
              />
            </div>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">
                {isEncrypting ? 'Encrypted Output' : 'Decrypted Output'}
              </label>
              <div className="w-full min-h-20 bg-neutral-700 text-neutral-100 p-2 rounded-md break-words font-mono">
                {output}
              </div>
            </div>
            
            {isEncrypting && decrypted && (
              <div className="mt-4">
                <label className="block text-sm text-neutral-400 mb-1">Verification (Decrypted)</label>
                <div className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md break-words font-mono">
                  {decrypted === input ? (
                    <span className="text-green-500">{decrypted} ✓</span>
                  ) : (
                    <span className="text-red-500">{decrypted} ✗</span>
                  )}
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
          
          {/* Console Output */}
          <div className="bg-neutral-800 rounded-lg flex-1 overflow-hidden">
            <div className="bg-neutral-700 px-4 py-2">
              <h3 className="font-medium">Console Output</h3>
            </div>
            <div className="p-4 font-mono text-sm text-neutral-300 h-40 overflow-y-auto">
              {consoleOutput.length > 0 ? (
                consoleOutput.map((log, index) => (
                  <div key={index} className="mb-1">{log}</div>
                ))
              ) : (
                <div className="text-neutral-500">Run the code to see output here...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Visualization Panel */}
      <div className="mt-6 bg-neutral-800 rounded-lg p-4">
        <h3 className="font-medium mb-4">Visualization</h3>
        
        {/* Step-by-Step Process */}
        <div className="mb-6">
          <h4 className="text-sm text-neutral-400 mb-2">Step-by-Step Process</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-neutral-700 rounded-md">
              <thead>
                <tr className="bg-neutral-600">
                  {isEncrypting ? (
                    <>
                      <th className="p-2 text-left">Character</th>
                      <th className="p-2 text-left">ASCII</th>
                      <th className="p-2 text-left">Calculation</th>
                      <th className="p-2 text-left">Encrypted</th>
                    </>
                  ) : (
                    <>
                      <th className="p-2 text-left">Encrypted</th>
                      <th className="p-2 text-left">Calculation</th>
                      <th className="p-2 text-left">ASCII</th>
                      <th className="p-2 text-left">Character</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {stepByStep.map((step, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-neutral-700" : "bg-neutral-650"}>
                    {isEncrypting ? (
                      <>
                        <td className="p-2">{step.original}</td>
                        <td className="p-2">{step.numeric}</td>
                        <td className="p-2">{step.calculation}</td>
                        <td className="p-2">{step.result}</td>
                      </>
                    ) : (
                      <>
                        <td className="p-2">{step.encrypted}</td>
                        <td className="p-2">{step.calculation}</td>
                        <td className="p-2">{step.numeric}</td>
                        <td className="p-2">{step.result}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Step by Step Explanation */}
        <div>
          <h4 className="text-sm text-neutral-400 mb-2">How It Works</h4>
          <div className="bg-neutral-700 p-3 rounded-md text-sm mb-2">
            {stepExplanation()}
          </div>
          <div className="flex space-x-2">
            {[0, 1, 2].map((step) => (
              <button
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep === step ? 'bg-blue-500' : 'bg-neutral-700 hover:bg-neutral-600'
                }`}
                onClick={() => setActiveStep(step)}
              >
                {step + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Information Panel */}
      <div className="mt-6 bg-neutral-800 rounded-lg p-4">
        <h3 className="font-medium mb-2">About RSA Cipher</h3>
        <p className="text-neutral-400">
          RSA (Rivest–Shamir–Adleman) is a public-key cryptosystem that is widely used for secure data 
          transmission. It was the first practical public-key cryptosystem, relying on the practical difficulty 
          of factoring the product of two large prime numbers.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Key Elements</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li><strong>Key Generation:</strong> Select two primes p and q, compute n = p×q and φ(n) = (p-1)×(q-1)</li>
              <li><strong>Public Key:</strong> (n, e) where gcd(e, φ(n)) = 1</li>
              <li><strong>Private Key:</strong> (n, d) where d ≡ e<sup>-1</sup> mod φ(n)</li>
              <li><strong>Encryption:</strong> C = M<sup>e</sup> mod n</li>
              <li><strong>Decryption:</strong> M = C<sup>d</sup> mod n</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Security Notes</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>For real-world security, p and q should be very large prime numbers (≥ 1024 bits)</li>
              <li>This implementation uses much smaller primes for educational purposes</li>
              <li>The security relies on the difficulty of factoring large numbers</li>
              <li>Common values for e are 3, 17, and 65537 (2<sup>16</sup>+1)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSACipherComponent;