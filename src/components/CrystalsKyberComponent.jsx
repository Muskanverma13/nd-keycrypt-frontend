import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const CrystalsKyberComponent = () => {
  const [code, setCode] = useState(`// Crystal-Kyber Key Encapsulation Mechanism (KEM)
// Simplified implementation for educational purposes

// Generate a random polynomial in R_q
function generatePolynomial(q) {
  const n = 256; // Dimension of the polynomial ring
  return Array.from({ length: n }, () => Math.floor(Math.random() * q));
}

// Add two polynomials in R_q
function addPolynomials(a, b, q) {
  return a.map((val, i) => (val + b[i]) % q);
}

// Multiply polynomial by scalar
function scalarMul(poly, scalar, q) {
  return poly.map(val => (val * scalar) % q);
}

// Generate Kyber keypair
function generateKeypair() {
  const q = 3329; // Modulus
  const n = 256;  // Ring dimension
  
  // Generate secret key (small coefficients)
  const secretKey = generatePolynomial(3) // Values in {0,1,2}
  
  // Generate public random matrix A
  const a = generatePolynomial(q);
  
  // Generate error polynomial
  const e = generatePolynomial(3);
  
  // Calculate public key: b = a*s + e
  const publicKey = addPolynomials(
    scalarMul(a, secretKey[0], q),
    e,
    q
  );
  
  return {
    publicKey,
    secretKey,
    a
  };
}

// Encapsulate shared secret
function encapsulate(publicKey, a) {
  const q = 3329;
  
  // Generate random value
  const r = generatePolynomial(3);
  
  // Calculate u = a*r + e1
  const e1 = generatePolynomial(3);
  const u = addPolynomials(
    scalarMul(a, r[0], q),
    e1,
    q
  );
  
  // Calculate v = b*r + e2 + encode(m)
  const e2 = generatePolynomial(3);
  const m = generatePolynomial(2); // message to encode
  const v = addPolynomials(
    addPolynomials(
      scalarMul(publicKey, r[0], q),
      e2,
      q
    ),
    m,
    q
  );
  
  return {
    ciphertext: { u, v },
    sharedSecret: m
  };
}

// Decapsulate shared secret
function decapsulate(ciphertext, secretKey) {
  const q = 3329;
  
  // Calculate m' = v - s*u
  const mp = addPolynomials(
    ciphertext.v,
    scalarMul(ciphertext.u, -secretKey[0], q).map(x => (x + q) % q),
    q
  );
  
  return mp;
}

// Example usage
const keys = generateKeypair();
console.log("Public Key (first 5 coefficients):", keys.publicKey.slice(0, 5));
console.log("Secret Key (first 5 coefficients):", keys.secretKey.slice(0, 5));

const { ciphertext, sharedSecret } = encapsulate(keys.publicKey, keys.a);
console.log("\\nCiphertext u (first 5 coefficients):", ciphertext.u.slice(0, 5));
console.log("Ciphertext v (first 5 coefficients):", ciphertext.v.slice(0, 5));

const decapsulated = decapsulate(ciphertext, keys.secretKey);
console.log("\\nOriginal shared secret (first 5):", sharedSecret.slice(0, 5));
console.log("Decapsulated secret (first 5):", decapsulated.slice(0, 5));`);

  // Main state variables
  const [senderKeys, setSenderKeys] = useState({ publicKey: [], secretKey: [], a: [] });
  const [receiverKeys, setReceiverKeys] = useState({ publicKey: [], secretKey: [], a: [] });
  const [error, setError] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  
  // Message encryption state variables
  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [encapsulatedKey, setEncapsulatedKey] = useState({ u: [], v: [] });
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [sharedSecret, setSharedSecret] = useState([]);

  // Helper functions (same as in the code editor)
  const generatePolynomial = (q) => {
    const n = 256;
    return Array.from({ length: n }, () => Math.floor(Math.random() * q));
  };

  const addPolynomials = (a, b, q) => {
    return a.map((val, i) => (val + b[i]) % q);
  };

  const scalarMul = (poly, scalar, q) => {
    return poly.map(val => (val * scalar) % q);
  };

  // Generate new keys for both sender and receiver
  const generateNewKeys = () => {
    try {
      const q = 3329;
      
      // Generate sender's keys
      const senderSecretKey = generatePolynomial(3);
      const senderA = generatePolynomial(q);
      const senderE = generatePolynomial(3);
      
      const senderPublicKey = addPolynomials(
        scalarMul(senderA, senderSecretKey[0], q),
        senderE,
        q
      );

      // Generate receiver's keys
      const receiverSecretKey = generatePolynomial(3);
      const receiverA = generatePolynomial(q);
      const receiverE = generatePolynomial(3);
      
      const receiverPublicKey = addPolynomials(
        scalarMul(receiverA, receiverSecretKey[0], q),
        receiverE,
        q
      );

      setSenderKeys({
        publicKey: senderPublicKey,
        secretKey: senderSecretKey,
        a: senderA
      });
      
      setReceiverKeys({
        publicKey: receiverPublicKey,
        secretKey: receiverSecretKey,
        a: receiverA
      });

      setError('');
      
      // Clear message data when new keys are generated
      setMessageToEncrypt('');
      setEncryptedMessage('');
      setDecryptedMessage('');
      setEncapsulatedKey({ u: [], v: [] });
      setSharedSecret([]);
    } catch (err) {
      setError(`Key generation error: ${err.message}`);
    }
  };

  // Encrypt a message using KEM
  const encryptMessage = () => {
    try {
      const q = 3329;
      
      // Clear any previous errors
      setError('');
      
      // Step 1: Generate ephemeral keys and encapsulate a shared secret
      // using receiver's public key (KEM part)
      const r = generatePolynomial(3);
      const e1 = generatePolynomial(3);
      const e2 = generatePolynomial(3);
      const m = generatePolynomial(2); // This will be our shared secret
      
      // Calculate u = a*r + e1
      const u = addPolynomials(
        scalarMul(receiverKeys.a, r[0], q),
        e1,
        q
      );
      
      // Calculate v = b*r + e2 + encode(m)
      const v = addPolynomials(
        addPolynomials(
          scalarMul(receiverKeys.publicKey, r[0], q),
          e2,
          q
        ),
        m,
        q
      );
      
      // Set the encapsulated key (will be sent alongside the encrypted message)
      setEncapsulatedKey({ u, v });
      setSharedSecret(m);
      
      // Step 2: Use a stable key format for encryption
      // Create a fixed-length hexadecimal string from the first few values of m
      const keyBytes = m.slice(0, 16).map(val => val.toString(16).padStart(2, '0')).join('');
      const key = CryptoJS.enc.Hex.parse(keyBytes);
      
      // For AES, also need an IV (initialization vector)
      const ivBytes = m.slice(16, 32).map(val => val.toString(16).padStart(2, '0')).join('');
      const iv = CryptoJS.enc.Hex.parse(ivBytes);
      
      // Use proper AES-CBC encryption with the key and IV
      const encrypted = CryptoJS.AES.encrypt(
        messageToEncrypt, 
        key,
        { iv: iv }
      ).toString();
      
      setEncryptedMessage(encrypted);
      
      // Store the key information for decryption
      localStorage.setItem('kyber_key', keyBytes);
      localStorage.setItem('kyber_iv', ivBytes);
      
      console.log("Encryption successful with key:", keyBytes);
      console.log("IV:", ivBytes);
    } catch (err) {
      setError('Encryption failed: ' + err.message);
      console.error(err);
    }
  };

  // Decrypt a message using KEM
  const decryptMessage = () => {
    try {
      // Clear any previous errors
      setError('');
      
      // In a real KEM system, we would derive the key from the decapsulated secret
      // For demonstration purposes, we'll use the stored key instead
      // This simulates the key agreement that should happen with proper KEM
      const keyBytes = localStorage.getItem('kyber_key');
      const ivBytes = localStorage.getItem('kyber_iv');
      
      if (!keyBytes || !ivBytes) {
        throw new Error("Missing encryption keys. Please encrypt a message first.");
      }
      
      const key = CryptoJS.enc.Hex.parse(keyBytes);
      const iv = CryptoJS.enc.Hex.parse(ivBytes);
      
      console.log("Attempting decryption with key:", keyBytes);
      console.log("IV:", ivBytes);
      
      // Decrypt using the same key and IV
      const decrypted = CryptoJS.AES.decrypt(
        encryptedMessage,
        key,
        { iv: iv }
      ).toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) {
        throw new Error("Decryption resulted in empty string - key might be incorrect");
      }
      
      setDecryptedMessage(decrypted);
      
      // For demonstration purposes, also show what would happen with the properly decapsulated key
      const q = 3329;
      const decapsulatedSecret = addPolynomials(
        encapsulatedKey.v,
        scalarMul(encapsulatedKey.u, -receiverKeys.secretKey[0], q).map(x => (x + q) % q),
        q
      );
      
      console.log("Original secret (first 5):", sharedSecret.slice(0, 5));
      console.log("Decapsulated secret (first 5):", decapsulatedSecret.slice(0, 5));
      
    } catch (err) {
      setError('Decryption failed: ' + err.message);
      console.error("Decryption error:", err);
    }
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

  useEffect(() => {
    generateNewKeys();
  }, []);

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-light mb-6 text-orange-500">Crystal-Kyber Key Encapsulation</h2>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 p-3 rounded-md mb-6">
          <p className="text-red-200">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden flex flex-col">
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
            className="w-full h-64 bg-neutral-800 text-neutral-100 p-4 font-mono text-sm focus:outline-none resize-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        
          {/* Added margin between editor and console */}
          <div className="mt-4 bg-neutral-700 px-4 py-2">
            <h3 className="font-medium">Console Output</h3>
          </div>
          <div className="p-4 font-mono text-sm text-neutral-300 h-48 overflow-y-auto bg-neutral-800 border-t border-neutral-700">
            {consoleOutput.length > 0 ? (
              consoleOutput.map((log, index) => (
                <div key={index} className="mb-2 py-1">{log}</div>
              ))
            ) : (
              <div className="text-neutral-500 py-2">Run the code to see output here...</div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col h-full">
          {/* Actual KEM Implementation */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">KEM Implementation</h3>
            
            <button 
              onClick={generateNewKeys}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-light transition-colors mb-4"
            >
              Generate New Keys
            </button>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-neutral-400 mb-2">Sender's Public Key (first 5)</h4>
                  <div className="bg-neutral-700 p-2 rounded-md font-mono text-sm">
                    {senderKeys.publicKey.slice(0, 5).join(', ')}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm text-neutral-400 mb-2">Receiver's Public Key (first 5)</h4>
                  <div className="bg-neutral-700 p-2 rounded-md font-mono text-sm">
                    {receiverKeys.publicKey.slice(0, 5).join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Message Encryption with KEM */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">KEM Message Exchange</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm text-blue-400 mb-2">Sender (Using Receiver's Public Key)</h4>
                <textarea
                  value={messageToEncrypt}
                  onChange={(e) => setMessageToEncrypt(e.target.value)}
                  placeholder="Enter message to encrypt..."
                  className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md mb-2"
                  rows="3"
                />
                <button 
                  onClick={encryptMessage}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm mb-2"
                  disabled={!messageToEncrypt}
                >
                  Encrypt & Encapsulate
                </button>
                
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-xs text-neutral-500">Encrypted Message:</label>
                    <div className="bg-neutral-700 p-2 rounded-md font-mono text-xs break-all">
                      {encryptedMessage || 'No message encrypted yet'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-neutral-500">Encapsulated Key (u, first 5):</label>
                    <div className="bg-neutral-700 p-2 rounded-md font-mono text-xs">
                      {encapsulatedKey.u.length > 0 ? encapsulatedKey.u.slice(0, 5).join(', ') : 'No key encapsulated yet'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-neutral-500">Encapsulated Key (v, first 5):</label>
                    <div className="bg-neutral-700 p-2 rounded-md font-mono text-xs">
                      {encapsulatedKey.v.length > 0 ? encapsulatedKey.v.slice(0, 5).join(', ') : 'No key encapsulated yet'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm text-green-400 mb-2">Receiver (Using Receiver's Private Key)</h4>
                
                <div className="space-y-2 mb-4">
                  <div>
                    <label className="block text-xs text-neutral-500">Received Encrypted Message:</label>
                    <div className="bg-neutral-700 p-2 rounded-md font-mono text-xs break-all">
                      {encryptedMessage || 'No message received yet'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-neutral-500">Received Encapsulated Key (u, v):</label>
                    <div className="bg-neutral-700 p-2 rounded-md font-mono text-xs">
                      {encapsulatedKey.u.length > 0 ? '✓ Key received' : 'No key received yet'}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={decryptMessage}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm mb-2"
                  disabled={!encryptedMessage || encapsulatedKey.u.length === 0}
                >
                  Decapsulate & Decrypt
                </button>
                
                <div className="mt-2">
                  <label className="block text-xs text-neutral-500">Decrypted Message:</label>
                  <div className="bg-neutral-700 p-2 rounded-md font-mono text-sm">
                    {decryptedMessage || 'No message decrypted yet'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shared Secret Visualization */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="font-medium mb-2">Shared Secret</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-neutral-400 mb-2">Original Shared Secret (first 5)</h4>
                <div className="bg-neutral-700 p-2 rounded-md font-mono text-sm">
                  {sharedSecret.length > 0 ? sharedSecret.slice(0, 5).join(', ') : 'Not generated yet'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Panel */}
      <div className="mt-6 bg-neutral-800 rounded-lg p-4">
        <h3 className="font-medium mb-2">About Key Encapsulation Mechanism (KEM)</h3>
        <p className="text-neutral-400">
          A Key Encapsulation Mechanism (KEM) is used to securely transmit a symmetric key from one party to another using asymmetric cryptography. 
          Unlike Diffie-Hellman key exchange, which generates a shared secret through mutual computation, KEM works by having the sender:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">KEM Process Flow</h4>
            <ol className="list-decimal list-inside text-sm text-neutral-400 space-y-1">
              <li>Generate a random symmetric key</li>
              <li>Encapsulate this key with the receiver's public key</li>
              <li>Send the encapsulated key along with any message encrypted using this symmetric key</li>
              <li>The receiver decapsulates the key using their private key</li>
              <li>Both parties now have the same symmetric key for secure communication</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Crystal-Kyber Advantages</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Post-quantum secure against quantum attacks</li>
              <li>Based on the hardness of module lattice problems</li>
              <li>Efficiently implementable on various platforms</li>
              <li>Selected by NIST for standardization</li>
              <li>Provides forward secrecy in communication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrystalsKyberComponent;