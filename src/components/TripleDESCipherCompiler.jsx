import React, { useState, useEffect } from 'react';

const TripleDESCipherCompiler = () => {
  const [code, setCode] = useState(`// Triple DES (3DES) implementation in JavaScript
// Pure JavaScript implementation for educational purposes
// Note: For production, use built-in crypto libraries

// This is a simplified implementation for demonstration
// Helper function to convert string to binary array
function strToBinary(str) {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const binary = str.charCodeAt(i).toString(2).padStart(8, '0');
    for (let j = 0; j < binary.length; j++) {
      result.push(parseInt(binary[j]));
    }
  }
  return result;
}

// Helper function to convert binary array to string
function binaryToStr(binary) {
  let result = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8).join('');
    result += String.fromCharCode(parseInt(byte, 2));
  }
  return result;
}

// Initial Permutation (IP)
const IP = [
  58, 50, 42, 34, 26, 18, 10, 2,
  60, 52, 44, 36, 28, 20, 12, 4,
  62, 54, 46, 38, 30, 22, 14, 6,
  64, 56, 48, 40, 32, 24, 16, 8,
  57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3,
  61, 53, 45, 37, 29, 21, 13, 5,
  63, 55, 47, 39, 31, 23, 15, 7
];

// Final Permutation (IP^-1)
const FP = [
  40, 8, 48, 16, 56, 24, 64, 32,
  39, 7, 47, 15, 55, 23, 63, 31,
  38, 6, 46, 14, 54, 22, 62, 30,
  37, 5, 45, 13, 53, 21, 61, 29,
  36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27,
  34, 2, 42, 10, 50, 18, 58, 26,
  33, 1, 41, 9, 49, 17, 57, 25
];

// Expansion table (E)
const E = [
  32, 1, 2, 3, 4, 5,
  4, 5, 6, 7, 8, 9,
  8, 9, 10, 11, 12, 13,
  12, 13, 14, 15, 16, 17,
  16, 17, 18, 19, 20, 21,
  20, 21, 22, 23, 24, 25,
  24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1
];

// S-boxes (simplified for demonstration)
const S = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
  ],
  // S-boxes 2-8 would be defined similarly
  // For brevity, we just use the first S-box for all
];

// P-box permutation
const P = [
  16, 7, 20, 21, 29, 12, 28, 17,
  1, 15, 23, 26, 5, 18, 31, 10,
  2, 8, 24, 14, 32, 27, 3, 9,
  19, 13, 30, 6, 22, 11, 4, 25
];

// Generate subkeys
function generateSubkeys(key) {
  // Simplified key schedule for demonstration
  // In a real implementation, this would perform proper key expansion
  
  const PC1 = [
    57, 49, 41, 33, 25, 17, 9,
    1, 58, 50, 42, 34, 26, 18,
    10, 2, 59, 51, 43, 35, 27,
    19, 11, 3, 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15,
    7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29,
    21, 13, 5, 28, 20, 12, 4
  ];
  
  const PC2 = [
    14, 17, 11, 24, 1, 5, 3, 28,
    15, 6, 21, 10, 23, 19, 12, 4,
    26, 8, 16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55, 30, 40,
    51, 45, 33, 48, 44, 49, 39, 56,
    34, 53, 46, 42, 50, 36, 29, 32
  ];
  
  // For simplicity, we're using a string key and converting to binary
  let keyBinary = strToBinary(key);
  
  // Pad or truncate key to 64 bits
  while (keyBinary.length < 64) keyBinary.push(0);
  if (keyBinary.length > 64) keyBinary = keyBinary.slice(0, 64);
  
  // Apply PC1 permutation
  let permutedKey = [];
  for (let i = 0; i < PC1.length; i++) {
    permutedKey.push(keyBinary[PC1[i] - 1]);
  }
  
  // Split into C and D
  let C = permutedKey.slice(0, 28);
  let D = permutedKey.slice(28);
  
  // Key schedule
  const subkeys = [];
  const shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
  
  for (let round = 0; round < 16; round++) {
    // Left circular shift
    for (let i = 0; i < shifts[round]; i++) {
      C.push(C.shift());
      D.push(D.shift());
    }
    
    // Combine C and D
    const combined = [...C, ...D];
    
    // Apply PC2 permutation
    const subkey = [];
    for (let i = 0; i < PC2.length; i++) {
      subkey.push(combined[PC2[i] - 1]);
    }
    
    subkeys.push(subkey);
  }
  
  return subkeys;
}

// F function (Feistel function)
function f(R, subkey) {
  // Expansion
  let expanded = [];
  for (let i = 0; i < E.length; i++) {
    expanded.push(R[E[i] - 1]);
  }
  
  // XOR with subkey
  for (let i = 0; i < expanded.length; i++) {
    expanded[i] = expanded[i] ^ subkey[i % subkey.length];
  }
  
  // S-box substitution
  let substituted = [];
  for (let i = 0; i < 8; i++) {
    const block = expanded.slice(i * 6, (i + 1) * 6);
    const row = (block[0] << 1) + block[5];
    const col = (block[1] << 3) + (block[2] << 2) + (block[3] << 1) + block[4];
    
    // Use S-box 1 for all blocks (simplified)
    const s = S[0][row][col];
    
    // Convert to binary and add to result
    const binary = s.toString(2).padStart(4, '0');
    for (let j = 0; j < 4; j++) {
      substituted.push(parseInt(binary[j]));
    }
  }
  
  // P-box permutation
  let result = [];
  for (let i = 0; i < P.length; i++) {
    result.push(substituted[P[i] - 1]);
  }
  
  return result;
}

// Single DES round
function desRound(LR, subkey) {
  const L = LR.slice(0, 32);
  const R = LR.slice(32);
  
  const newL = [...R];
  
  const fResult = f(R, subkey);
  
  const newR = [];
  for (let i = 0; i < L.length; i++) {
    newR.push(L[i] ^ fResult[i]);
  }
  
  return [...newL, ...newR];
}

// Single DES encryption
function desEncrypt(plaintext, key) {
  // Generate subkeys
  const subkeys = generateSubkeys(key);
  
  // Initial permutation
  let permuted = [];
  for (let i = 0; i < IP.length; i++) {
    permuted.push(plaintext[IP[i] - 1]);
  }
  
  // 16 rounds
  let state = permuted;
  for (let round = 0; round < 16; round++) {
    state = desRound(state, subkeys[round]);
  }
  
  // Swap L and R
  const L = state.slice(0, 32);
  const R = state.slice(32);
  state = [...R, ...L];
  
  // Final permutation
  let result = [];
  for (let i = 0; i < FP.length; i++) {
    result.push(state[FP[i] - 1]);
  }
  
  return result;
}

// Single DES decryption
function desDecrypt(ciphertext, key) {
  // Generate subkeys
  const subkeys = generateSubkeys(key);
  
  // Initial permutation
  let permuted = [];
  for (let i = 0; i < IP.length; i++) {
    permuted.push(ciphertext[IP[i] - 1]);
  }
  
  // 16 rounds - use subkeys in reverse order
  let state = permuted;
  for (let round = 15; round >= 0; round--) {
    state = desRound(state, subkeys[round]);
  }
  
  // Swap L and R
  const L = state.slice(0, 32);
  const R = state.slice(32);
  state = [...R, ...L];
  
  // Final permutation
  let result = [];
  for (let i = 0; i < FP.length; i++) {
    result.push(state[FP[i] - 1]);
  }
  
  return result;
}

// Triple DES encryption (EDE mode)
function tripleDesEncrypt(plaintext, key1, key2, key3) {
  const binary = strToBinary(plaintext);
  let result = [];
  
  // Process 64-bit blocks
  for (let i = 0; i < binary.length; i += 64) {
    let block = binary.slice(i, i + 64);
    while (block.length < 64) block.push(0); // Pad if needed
    
    // Apply 3DES (Encrypt-Decrypt-Encrypt)
    let encrypted = desEncrypt(block, key1);
    encrypted = desDecrypt(encrypted, key2);
    encrypted = desEncrypt(encrypted, key3);
    
    result = result.concat(encrypted);
  }
  
  return result;
}

// Triple DES decryption (EDE mode)
function tripleDesDecrypt(ciphertext, key1, key2, key3) {
  const binary = ciphertext;
  let result = [];
  
  // Process 64-bit blocks
  for (let i = 0; i < binary.length; i += 64) {
    let block = binary.slice(i, i + 64);
    while (block.length < 64) block.push(0); // Pad if needed
    
    // Apply 3DES (Decrypt-Encrypt-Decrypt)
    let decrypted = desDecrypt(block, key3);
    decrypted = desEncrypt(decrypted, key2);
    decrypted = desDecrypt(decrypted, key1);
    
    result = result.concat(decrypted);
  }
  
  return result;
}

// Hex encoding function
function binaryToHex(binary) {
  let hex = '';
  for (let i = 0; i < binary.length; i += 4) {
    const nibble = binary.slice(i, i + 4).join('');
    hex += parseInt(nibble, 2).toString(16).toUpperCase();
  }
  return hex;
}

// Hex decoding function
function hexToBinary(hex) {
  const binary = [];
  for (let i = 0; i < hex.length; i++) {
    const nibble = parseInt(hex[i], 16).toString(2).padStart(4, '0');
    for (let j = 0; j < nibble.length; j++) {
      binary.push(parseInt(nibble[j]));
    }
  }
  return binary;
}

// Example usage
function encryptExample() {
  const plaintext = "HELLO";
  const key1 = "KEY1";
  const key2 = "KEY2";
  const key3 = "KEY3";
  
  console.log("Plaintext:", plaintext);
  
  const encrypted = tripleDesEncrypt(plaintext, key1, key2, key3);
  const encryptedHex = binaryToHex(encrypted);
  console.log("Encrypted (Hex):", encryptedHex);
  
  const decrypted = tripleDesDecrypt(encrypted, key1, key2, key3);
  const decryptedText = binaryToStr(decrypted);
  console.log("Decrypted:", decryptedText);
}

encryptExample();

// Note: This is a simplified implementation for educational purposes
// For production use, utilize built-in crypto libraries
// e.g., crypto.createCipheriv('des-ede3', key, iv) in Node.js`);

  const [input, setInput] = useState('HELLO WORLD');
  const [key1, setKey1] = useState('KEY1');
  const [key2, setKey2] = useState('KEY2');
  const [key3, setKey3] = useState('KEY3');
  const [output, setOutput] = useState('');
  const [hexOutput, setHexOutput] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [keyMode, setKeyMode] = useState('triple');

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

  // Helper functions
  const strToBinary = (str) => {
    const result = [];
    for (let i = 0; i < str.length; i++) {
      const binary = str.charCodeAt(i).toString(2).padStart(8, '0');
      for (let j = 0; j < binary.length; j++) {
        result.push(parseInt(binary[j]));
      }
    }
    return result;
  };

  const binaryToStr = (binary) => {
    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      if (i + 8 <= binary.length) {
        const byte = binary.slice(i, i + 8).join('');
        result += String.fromCharCode(parseInt(byte, 2));
      }
    }
    return result;
  };

  const binaryToHex = (binary) => {
    let hex = '';
    for (let i = 0; i < binary.length; i += 4) {
      if (i + 4 <= binary.length) {
        const nibble = binary.slice(i, i + 4).join('');
        hex += parseInt(nibble, 2).toString(16).toUpperCase();
      }
    }
    return hex;
  };

  const hexToBinary = (hex) => {
    const binary = [];
    for (let i = 0; i < hex.length; i++) {
      const nibble = parseInt(hex[i], 16).toString(2).padStart(4, '0');
      for (let j = 0; j < nibble.length; j++) {
        binary.push(parseInt(nibble[j]));
      }
    }
    return binary;
  };

  // Simplified implementation for demonstration
  const encryptWithTripleDES = () => {
    try {
      // Convert input to binary
      const binary = strToBinary(input);
      
      // For a real implementation, we would use the actual 3DES algorithm
      // This is a simplified version that just demonstrates the concept
      
      // Apply a simple transformation to simulate encryption
      const encryptedBinary = [];
      for (let i = 0; i < binary.length; i++) {
        // XOR with key bits (simplified)
        const keyIndex = i % (key1.length + key2.length + key3.length);
        const keyChar = keyIndex < key1.length 
          ? key1.charCodeAt(keyIndex % key1.length) 
          : keyIndex < (key1.length + key2.length)
            ? key2.charCodeAt((keyIndex - key1.length) % key2.length)
            : key3.charCodeAt((keyIndex - key1.length - key2.length) % key3.length);
            
        encryptedBinary.push(binary[i] ^ (keyChar & 1));
      }
      
      // Convert to hex for display
      const hex = binaryToHex(encryptedBinary);
      setHexOutput(hex);
      
      return encryptedBinary;
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      return [];
    }
  };

  const decryptWithTripleDES = () => {
    try {
      // Input might be hex, try to convert
      let binary;
      if (/^[0-9A-Fa-f]+$/.test(input.replace(/\s/g, ''))) {
        // Input is hex
        binary = hexToBinary(input.replace(/\s/g, ''));
      } else {
        // Input is text
        binary = strToBinary(input);
      }
      
      // Apply a simple transformation to simulate decryption (same as encryption in this demo)
      const decryptedBinary = [];
      for (let i = 0; i < binary.length; i++) {
        // XOR with key bits (simplified)
        const keyIndex = i % (key1.length + key2.length + key3.length);
        const keyChar = keyIndex < key1.length 
          ? key1.charCodeAt(keyIndex % key1.length) 
          : keyIndex < (key1.length + key2.length)
            ? key2.charCodeAt((keyIndex - key1.length) % key2.length)
            : key3.charCodeAt((keyIndex - key1.length - key2.length) % key3.length);
            
        decryptedBinary.push(binary[i] ^ (keyChar & 1));
      }
      
      return decryptedBinary;
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      return [];
    }
  };

  // Process text whenever input, keys or encryption mode changes
  useEffect(() => {
    if (isEncrypting) {
      const encrypted = encryptWithTripleDES();
      setOutput(binaryToStr(encrypted));
    } else {
      const decrypted = decryptWithTripleDES();
      setOutput(binaryToStr(decrypted));
    }
  }, [input, key1, key2, key3, isEncrypting, keyMode]);

  // Show step-by-step explanation based on activeStep
  const stepExplanation = () => {
    const encryptSteps = [
      "1. Convert plaintext to binary data",
      "2. Apply Initial Permutation (IP) to the data",
      "3. Split the data into left and right halves",
      "4. Apply the Feistel network for 16 rounds with the first key (encryption)",
      "5. Apply the Feistel network for 16 rounds with the second key (decryption)",
      "6. Apply the Feistel network for 16 rounds with the third key (encryption)",
      "7. Apply Final Permutation (FP) to get the ciphertext"
    ];
    
    const decryptSteps = [
      "1. Convert ciphertext to binary data",
      "2. Apply Initial Permutation (IP) to the data",
      "3. Split the data into left and right halves",
      "4. Apply the Feistel network for 16 rounds with the third key (decryption)",
      "5. Apply the Feistel network for 16 rounds with the second key (encryption)",
      "6. Apply the Feistel network for 16 rounds with the first key (decryption)",
      "7. Apply Final Permutation (FP) to get the plaintext"
    ];
    
    return isEncrypting ? encryptSteps[activeStep % encryptSteps.length] : decryptSteps[activeStep % decryptSteps.length];
  };

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Triple DES Cipher Compiler</h2>
      
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
        
        {/* Interactive Panel & Console */}
        <div className="flex flex-col h-full">
          {/* Interactive Panel */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">Interactive Triple DES</h3>
            
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
              <label className="block text-sm text-neutral-400 mb-1">Key Mode</label>
              <div className="flex space-x-4">
                <button 
                  className={`px-4 py-2 rounded-md ${keyMode === 'triple' ? 'bg-orange-500 text-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  onClick={() => setKeyMode('triple')}
                >
                  Triple DES (3 Keys)
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${keyMode === 'single' ? 'bg-orange-500 text-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  onClick={() => setKeyMode('single')}
                >
                  Triple DES (Same Key)
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-neutral-400 mb-1">Keys</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <input
                    type="text"
                    value={key1}
                    onChange={(e) => {
                      setKey1(e.target.value);
                      if (keyMode === 'single') {
                        setKey2(e.target.value);
                        setKey3(e.target.value);
                      }
                    }}
                    className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    placeholder="Key 1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={key2}
                    onChange={(e) => setKey2(e.target.value)}
                    className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    placeholder="Key 2"
                    disabled={keyMode === 'single'}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={key3}
                    onChange={(e) => setKey3(e.target.value)}
                    className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                    placeholder="Key 3"
                    disabled={keyMode === 'single'}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-neutral-400 mb-1">Input Text</label>
              <textarea
                className="w-full h-20 bg-neutral-700 text-neutral-100 p-2 rounded-md resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to encrypt/decrypt"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-neutral-400 mb-1">Output (Text)</label>
              <div className="w-full min-h-12 bg-neutral-700 text-neutral-100 p-2 rounded-md break-words font-mono">
                {output}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Output (Hex)</label>
              <div className="w-full min-h-12 bg-neutral-700 text-neutral-100 p-2 rounded-md break-words font-mono">
                {hexOutput}
              </div>
            </div>
          </div>
          
          {/* Visualization Panel */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-2">Visualization</h3>
            
            {/* Triple DES Diagram */}
            <div className="mb-4">
              <h4 className="text-sm text-neutral-400 mb-2">Triple DES Process</h4>
              <div className="bg-neutral-700 p-3 rounded-md">
                {isEncrypting ? (
                  <div className="flex flex-col md:flex-row justify-between items-center text-center text-sm">
                    <div className="p-2">Plaintext</div>
                    <div className="p-2 bg-red-600 rounded-md">DES Encrypt<br/>Key 1</div>
                    <div className="p-2">→</div>
                    <div className="p-2 bg-amber-400 rounded-md">DES Decrypt<br/>Key 2</div>
                    <div className="p-2">→</div>
                    <div className="p-2 bg-lime-400 rounded-md">DES Encrypt<br/>Key 3</div>
                    <div className="p-2">Ciphertext</div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row justify-between items-center text-center text-sm">
                    <div className="p-2">Ciphertext</div>
                    <div className="p-2 bg-blue-800 rounded-md">DES Decrypt<br/>Key 3</div>
                    <div className="p-2">→</div>
                    <div className="p-2 bg-blue-800 rounded-md">DES Encrypt<br/>Key 2</div>
                    <div className="p-2">→</div>
                    <div className="p-2 bg-blue-800 rounded-md">DES Decrypt<br/>Key 1</div>
                    <div className="p-2">Plaintext</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Step-by-step Explanation */}
            <div>
              <h4 className="text-sm text-neutral-400 mb-2">Step-by-step Explanation</h4>
              <div className="bg-neutral-700 p-3 rounded-md">
                <div className="mb-2">{stepExplanation()}</div>
                <div className="flex justify-between">
                  <button 
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    className="bg-neutral-600 hover:bg-neutral-500 px-3 py-1 rounded-md text-sm"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="bg-green-700 hover:bg-blue-700 px-3 py-1 rounded-md text-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Console Output */}
          <div className="bg-neutral-800 rounded-lg flex-grow">
            <div className="bg-neutral-700 px-4 py-2">
              <h3 className="font-medium">Console Output</h3>
            </div>
            <div className="p-4 font-mono text-sm text-green-400 h-48 overflow-y-auto">
              {consoleOutput.length > 0 ? (
                consoleOutput.map((log, index) => (
                  <div key={index} className="mb-1"> {log}</div>
                ))
              ) : (
                <div className="text-neutral-500 italic">Run the code to see output here...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Information Panel */}
      <div className="mt-6 bg-neutral-800 rounded-lg p-4">
        <h3 className="font-medium mb-2">About Caesar Cipher</h3>
        <p className="text-neutral-400">
        Triple DES (3DES) is a symmetric encryption algorithm that evolved from the original Data Encryption Standard (DES). It applies the DES algorithm three times to each data block, providing enhanced security compared to its predecessor.

        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Advantages</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Enhanced security over original DES</li>
              <li>Backwards compatible with DES</li>
              <li>Established, well-tested encryption method</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Limitations</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Slower than modern encryption</li>
              <li>Small 64-bit block size</li>
              <li>Gradually becoming obsolete technology</li>
            </ul>
          </div>
          </div>
          </div>
    </div>
  );
};

export default TripleDESCipherCompiler;