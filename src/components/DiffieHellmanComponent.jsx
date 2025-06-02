import React, { useState, useEffect } from 'react';

const DiffieHellmanComponent = () => {
  const [code, setCode] = useState(`// Diffie-Hellman Key Exchange Implementation

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

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

// Generate Diffie-Hellman parameters
function generateDHParams() {
  const p = 23; // Prime modulus (should be much larger in practice)
  const g = 5;  // Generator
  
  return { p, g };
}

// Generate private and public keys
function generateKeys(p, g) {
  // Private key (random number)
  const privateKey = Math.floor(Math.random() * (p - 2)) + 2;
  
  // Public key = g^privateKey mod p
  const publicKey = modPow(g, privateKey, p);
  
  return { privateKey, publicKey };
}

// Calculate shared secret
function calculateSharedSecret(privateKey, otherPublicKey, p) {
  return modPow(otherPublicKey, privateKey, p);
}

// Example usage
const params = generateDHParams();
console.log("Shared Parameters:");
console.log("Prime (p):", params.p);
console.log("Generator (g):", params.g);

// Alice's keys
const aliceKeys = generateKeys(params.p, params.g);
console.log("\\nAlice's Keys:");
console.log("Private:", aliceKeys.privateKey);
console.log("Public:", aliceKeys.publicKey);

// Bob's keys
const bobKeys = generateKeys(params.p, params.g);
console.log("\\nBob's Keys:");
console.log("Private:", bobKeys.privateKey);
console.log("Public:", bobKeys.publicKey);

// Shared secrets (should be the same)
const aliceShared = calculateSharedSecret(aliceKeys.privateKey, bobKeys.publicKey, params.p);
const bobShared = calculateSharedSecret(bobKeys.privateKey, aliceKeys.publicKey, params.p);

console.log("\\nShared Secrets:");
console.log("Alice's:", aliceShared);
console.log("Bob's:", bobShared);
console.log("Match:", aliceShared === bobShared);`);
  const [p, setP] = useState(2039); // Using larger prime for better security
  const [g, setG] = useState(2);    // Common generator value
  const [alicePrivate, setAlicePrivate] = useState(0);
  const [bobPrivate, setBobPrivate] = useState(0);
  const [alicePublic, setAlicePublic] = useState(0);
  const [bobPublic, setBobPublic] = useState(0);
  const [aliceShared, setAliceShared] = useState(0);
  const [bobShared, setBobShared] = useState(0);
  const [error, setError] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [stepByStep, setStepByStep] = useState([]);

  // Helper functions (keep only one copy)
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const modPow = (base, exponent, modulus) => {
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
  };

  const generateRandomPrivateKey = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % (p - 2) + 2;
  };

  const isPrimitiveRoot = (g, p) => {
    const factors = findPrimeFactors(p - 1);
    for (const factor of factors) {
      if (modPow(g, (p - 1) / factor, p) === 1) {
        return false;
      }
    }
    return true;
  };

  const findPrimeFactors = (n) => {
    const factors = new Set();
    let num = n;
    
    for (let i = 2; i * i <= num; i++) {
      while (num % i === 0) {
        factors.add(i);
        num = num / i;
      }
    }
    if (num > 1) factors.add(num);
    
    return Array.from(factors);
  };

  const calculatePublicKey = (privateKey) => {
    return modPow(g, privateKey, p);
  };

  const calculateSharedSecret = (privateKey, otherPublicKey) => {
    return modPow(otherPublicKey, privateKey, p);
  };

  // Run code in console
  const runCode = () => {
    try {
      const logs = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalConsoleLog(...args);
      };
      
      eval(code);
      
      console.log = originalConsoleLog;
      setConsoleOutput(logs);
    } catch (error) {
      setConsoleOutput([`Error: ${error.message}`]);
    }
  };

  // Generate new keys
  const generateNewKeys = () => {
    try {
      if (!isPrime(p)) {
        setError('p must be a prime number');
        return;
      }
      
      const newAlicePrivate = generateRandomPrivateKey();
      const newBobPrivate = generateRandomPrivateKey();
      
      setAlicePrivate(newAlicePrivate);
      setBobPrivate(newBobPrivate);
      
      const newAlicePublic = calculatePublicKey(newAlicePrivate);
      const newBobPublic = calculatePublicKey(newBobPrivate);
      
      setAlicePublic(newAlicePublic);
      setBobPublic(newBobPublic);
      
      const newAliceShared = calculateSharedSecret(newAlicePrivate, newBobPublic);
      const newBobShared = calculateSharedSecret(newBobPrivate, newAlicePublic);
      
      setAliceShared(newAliceShared);
      setBobShared(newBobShared);
      
      setError('');
      
      updateStepByStep(newAlicePrivate, newBobPrivate, newAlicePublic, newBobPublic, newAliceShared, newBobShared);
    } catch (err) {
      setError(`Key generation error: ${err.message}`);
    }
  };

  const updateStepByStep = (aPriv, bPriv, aPub, bPub, aShared, bShared) => {
    setStepByStep([
      {
        step: 'Public Parameters',
        details: `p = ${p}, g = ${g}`,
      },
      {
        step: 'Private Keys',
        details: `Alice: ${aPriv}, Bob: ${bPriv}`,
      },
      {
        step: 'Public Keys',
        details: `Alice: g^a mod p = ${aPub}, Bob: g^b mod p = ${bPub}`,
      },
      {
        step: 'Shared Secrets',
        details: `Alice: ${aShared}, Bob: ${bShared}`,
        match: aShared === bShared,
      },
    ]);
  };

  useEffect(() => {
    generateNewKeys();
  }, [p, g]);

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-light mb-6 text-orange-500">Diffie-Hellman Key Exchange</h2>
      
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
          {/* Parameters Panel */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">Parameters</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Prime Modulus (p)</label>
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
                <label className="block text-sm text-neutral-400 mb-1">Generator (g)</label>
                <input
                  type="number"
                  value={g}
                  onChange={(e) => setG(parseInt(e.target.value) || 0)}
                  className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                  min="2"
                />
              </div>
            </div>
            
            <button 
              onClick={generateNewKeys}
              className="bg-orange-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm font-light transition-colors"
            >
              Generate New Keys
            </button>
          </div>
          
          {/* Key Exchange Panel */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">Key Exchange</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm text-neutral-400 mb-2">A</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-neutral-500">Private Key (a)</label>
                    <input
                      type="number"
                      value={alicePrivate}
                      readOnly
                      className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500">Public Key (g^a mod p)</label>
                    <input
                      type="number"
                      value={alicePublic}
                      readOnly
                      className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500">Shared Secret</label>
                    <input
                      type="number"
                      value={aliceShared}
                      readOnly
                      className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-neutral-400 mb-2">B</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-neutral-500">Private Key (b)</label>
                    <input
                      type="number"
                      value={bobPrivate}
                      readOnly
                      className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500">Public Key (g^b mod p)</label>
                    <input
                      type="number"
                      value={bobPublic}
                      readOnly
                      className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500">Shared Secret</label>
                    <input
                      type="number"
                      value={bobShared}
                      readOnly
                      className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
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
          <div className="space-y-4">
            {stepByStep.map((step, index) => (
              <div key={index} className="bg-neutral-700 p-3 rounded-md">
                <div className="font-medium mb-1">{step.step}</div>
                <div className="text-sm text-neutral-300">{step.details}</div>
                {step.match !== undefined && (
                  <div className={`text-sm mt-1 ${step.match ? 'text-green-500' : 'text-red-500'}`}>
                    {step.match ? '✓ Shared secrets match!' : '✗ Shared secrets do not match!'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Information Panel */}
      <div className="mt-6 bg-neutral-800 rounded-lg p-4">
        <h3 className="font-medium mb-2">About Diffie-Hellman Key Exchange</h3>
        <p className="text-neutral-400">
          The Diffie-Hellman key exchange is a method that allows two parties to establish a shared secret key
          over an insecure channel. It's one of the first public-key protocols, originally published by Whitfield
          Diffie and Martin Hellman in 1976.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Key Elements</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li><strong>Public Parameters:</strong> Prime modulus p and generator g</li>
              <li><strong>Private Keys:</strong> Random numbers a and b chosen by Alice and Bob</li>
              <li><strong>Public Keys:</strong> g^a mod p and g^b mod p</li>
              <li><strong>Shared Secret:</strong> (g^a)^b mod p = (g^b)^a mod p</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Security Notes</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Security relies on the Discrete Logarithm Problem</li>
              <li>For real-world security, p should be a large prime (≥ 2048 bits)</li>
              <li>This implementation uses small numbers for educational purposes</li>
              <li>The generator g should be a primitive root modulo p</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffieHellmanComponent;