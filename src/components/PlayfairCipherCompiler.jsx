import React, { useState, useEffect } from 'react';

const PlayfairCipherCompiler = () => {
  const [code, setCode] = useState(`// Playfair Cipher implementation
// Note: Traditionally J is merged with I in the 5x5 grid

function createPlayfairMatrix(key) {
  // Prepare the key by removing duplicates and J (typically replaced with I)
  key = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let chars = key.split('');
  let uniqueChars = [];
  
  // Remove duplicate characters from key
  chars.forEach(char => {
    if (!uniqueChars.includes(char)) {
      uniqueChars.push(char);
    }
  });
  
  // Add remaining alphabet characters (except J)
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    if (char !== 'J' && !uniqueChars.includes(char)) {
      uniqueChars.push(char);
    }
  }
  
  // Create 5x5 matrix
  const matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(uniqueChars.slice(i * 5, (i + 1) * 5));
  }
  
  return matrix;
}

function findPosition(matrix, char) {
  // Replace J with I as per convention
  char = char === 'J' ? 'I' : char;
  
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return { row, col };
      }
    }
  }
  return null; // Should not happen with proper input
}

function prepareText(text) {
  // Convert to uppercase, replace J with I, remove non-alphabetic chars
  text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  
  // Split into digraphs and handle same letter pairs
  const digraphs = [];
  let i = 0;
  
  while (i < text.length) {
    const char1 = text[i];
    let char2;
    
    if (i + 1 < text.length) {
      char2 = text[i + 1];
      
      // If same chars, insert 'X' (or another uncommon letter)
      if (char1 === char2) {
        char2 = 'X';
        i += 1; // Only advance one position
      } else {
        i += 2; // Advance past both chars
      }
    } else {
      // If odd number of chars, append 'X'
      char2 = 'X';
      i += 1;
    }
    
    digraphs.push(char1 + char2);
  }
  
  return digraphs;
}

function playfairEncrypt(text, key) {
  const matrix = createPlayfairMatrix(key);
  const digraphs = prepareText(text);
  let encrypted = '';
  
  // Process each digraph
  digraphs.forEach(digraph => {
    const char1 = digraph[0];
    const char2 = digraph[1];
    
    const pos1 = findPosition(matrix, char1);
    const pos2 = findPosition(matrix, char2);
    
    let newChar1, newChar2;
    
    // Same row rule
    if (pos1.row === pos2.row) {
      newChar1 = matrix[pos1.row][(pos1.col + 1) % 5];
      newChar2 = matrix[pos2.row][(pos2.col + 1) % 5];
    }
    // Same column rule
    else if (pos1.col === pos2.col) {
      newChar1 = matrix[(pos1.row + 1) % 5][pos1.col];
      newChar2 = matrix[(pos2.row + 1) % 5][pos2.col];
    }
    // Rectangle rule
    else {
      newChar1 = matrix[pos1.row][pos2.col];
      newChar2 = matrix[pos2.row][pos1.col];
    }
    
    encrypted += newChar1 + newChar2;
  });
  
  return encrypted;
}

function playfairDecrypt(text, key) {
  const matrix = createPlayfairMatrix(key);
  // Prepare ciphertext - just split into digraphs
  const digraphs = [];
  
  for (let i = 0; i < text.length; i += 2) {
    if (i + 1 < text.length) {
      digraphs.push(text[i] + text[i + 1]);
    }
  }
  
  let decrypted = '';
  
  // Process each digraph
  digraphs.forEach(digraph => {
    const char1 = digraph[0];
    const char2 = digraph[1];
    
    const pos1 = findPosition(matrix, char1);
    const pos2 = findPosition(matrix, char2);
    
    let newChar1, newChar2;
    
    // Same row rule (shift left)
    if (pos1.row === pos2.row) {
      newChar1 = matrix[pos1.row][(pos1.col - 1 + 5) % 5];
      newChar2 = matrix[pos2.row][(pos2.col - 1 + 5) % 5];
    }
    // Same column rule (shift up)
    else if (pos1.col === pos2.col) {
      newChar1 = matrix[(pos1.row - 1 + 5) % 5][pos1.col];
      newChar2 = matrix[(pos2.row - 1 + 5) % 5][pos2.col];
    }
    // Rectangle rule (swap columns)
    else {
      newChar1 = matrix[pos1.row][pos2.col];
      newChar2 = matrix[pos2.row][pos1.col];
    }
    
    decrypted += newChar1 + newChar2;
  });
  
  return decrypted;
}

// Example usage
const key = "KEYWORD";
const plaintext = "HELLO WORLD";
const encrypted = playfairEncrypt(plaintext, key);
const decrypted = playfairDecrypt(encrypted, key);

console.log("Key Matrix:");
const matrix = createPlayfairMatrix(key);
matrix.forEach(row => console.log(row.join(' ')));

console.log("\\nPlaintext:", plaintext);
console.log("Prepared text:", prepareText(plaintext).join(' '));
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);`);

  const [input, setInput] = useState('HELLO WORLD');
  const [key, setKey] = useState('KEYWORD');
  const [output, setOutput] = useState('');
  const [keyMatrix, setKeyMatrix] = useState([]);
  const [digraphs, setDigraphs] = useState([]);
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

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

  // Create the Playfair key matrix
  const createMatrix = (keyStr) => {
    // Prepare the key (uppercase, remove J, remove duplicates)
    keyStr = keyStr.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let chars = keyStr.split('');
    let uniqueChars = [];
    
    // Remove duplicate characters from key
    chars.forEach(char => {
      if (!uniqueChars.includes(char)) {
        uniqueChars.push(char);
      }
    });
    
    // Add remaining alphabet characters (except J)
    for (let i = 65; i <= 90; i++) {
      const char = String.fromCharCode(i);
      if (char !== 'J' && !uniqueChars.includes(char)) {
        uniqueChars.push(char);
      }
    }
    
    // Create 5x5 matrix
    const matrix = [];
    for (let i = 0; i < 5; i++) {
      matrix.push(uniqueChars.slice(i * 5, (i + 1) * 5));
    }
    
    return matrix;
  };

  // Prepare text for Playfair (split into digraphs, handle repeated letters)
  const preparePlayfairText = (text) => {
    // Convert to uppercase, replace J with I, remove non-alphabetic chars
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    
    // Split into digraphs and handle same letter pairs
    const digraphs = [];
    let i = 0;
    
    while (i < text.length) {
      const char1 = text[i];
      let char2;
      
      if (i + 1 < text.length) {
        char2 = text[i + 1];
        
        // If same chars, insert 'X' (or another uncommon letter)
        if (char1 === char2) {
          char2 = 'X';
          i += 1; // Only advance one position
        } else {
          i += 2; // Advance past both chars
        }
      } else {
        // If odd number of chars, append 'X'
        char2 = 'X';
        i += 1;
      }
      
      digraphs.push(char1 + char2);
    }
    
    return digraphs;
  };

  // Find position of character in matrix
  const findPosition = (matrix, char) => {
    // Replace J with I as per convention
    char = char === 'J' ? 'I' : char;
    
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === char) {
          return { row, col };
        }
      }
    }
    return null;
  };

  // Function to encrypt/decrypt based on current settings
  const processText = () => {
    try {
      // Generate key matrix
      const matrix = createMatrix(key);
      setKeyMatrix(matrix);
      
      if (isEncrypting) {
        // Prepare text into digraphs
        const prepared = preparePlayfairText(input);
        setDigraphs(prepared);
        
        // Encrypt each digraph
        let result = '';
        prepared.forEach(digraph => {
          const char1 = digraph[0];
          const char2 = digraph[1];
          
          const pos1 = findPosition(matrix, char1);
          const pos2 = findPosition(matrix, char2);
          
          let newChar1, newChar2;
          
          // Same row rule
          if (pos1.row === pos2.row) {
            newChar1 = matrix[pos1.row][(pos1.col + 1) % 5];
            newChar2 = matrix[pos2.row][(pos2.col + 1) % 5];
          }
          // Same column rule
          else if (pos1.col === pos2.col) {
            newChar1 = matrix[(pos1.row + 1) % 5][pos1.col];
            newChar2 = matrix[(pos2.row + 1) % 5][pos2.col];
          }
          // Rectangle rule
          else {
            newChar1 = matrix[pos1.row][pos2.col];
            newChar2 = matrix[pos2.row][pos1.col];
          }
          
          result += newChar1 + newChar2;
        });
        
        setOutput(result);
      } else {
        // For decryption, split into digraphs
        const digraphs = [];
        const cleanInput = input.toUpperCase().replace(/[^A-Z]/g, '');
        
        for (let i = 0; i < cleanInput.length; i += 2) {
          if (i + 1 < cleanInput.length) {
            digraphs.push(cleanInput[i] + cleanInput[i + 1]);
          }
        }
        setDigraphs(digraphs);
        
        // Decrypt each digraph
        let result = '';
        digraphs.forEach(digraph => {
          const char1 = digraph[0];
          const char2 = digraph[1];
          
          const pos1 = findPosition(matrix, char1);
          const pos2 = findPosition(matrix, char2);
          
          let newChar1, newChar2;
          
          // Same row rule (shift left)
          if (pos1.row === pos2.row) {
            newChar1 = matrix[pos1.row][(pos1.col - 1 + 5) % 5];
            newChar2 = matrix[pos2.row][(pos2.col - 1 + 5) % 5];
          }
          // Same column rule (shift up)
          else if (pos1.col === pos2.col) {
            newChar1 = matrix[(pos1.row - 1 + 5) % 5][pos1.col];
            newChar2 = matrix[(pos2.row - 1 + 5) % 5][pos2.col];
          }
          // Rectangle rule (swap columns)
          else {
            newChar1 = matrix[pos1.row][pos2.col];
            newChar2 = matrix[pos2.row][pos1.col];
          }
          
          result += newChar1 + newChar2;
        });
        
        setOutput(result);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  // Process text whenever input, key or encryption mode changes
  useEffect(() => {
    processText();
  }, [input, key, isEncrypting]);

  // Show step-by-step explanation based on activeStep
  const stepExplanation = () => {
    const encryptSteps = [
      "1. Generate the key square with the keyword, filling remaining positions with the rest of the alphabet (excluding J)",
      "2. Prepare the text by splitting into pairs, inserting 'X' between repeated letters, and adding 'X' if needed to complete a pair",
      "3. For each pair, find the corresponding letters in the key square",
      "4. Apply Playfair rules: same row → shift right, same column → shift down, different row/column → form rectangle"
    ];
    
    const decryptSteps = [
      "1. Generate the key square with the keyword, filling remaining positions with the rest of the alphabet (excluding J)",
      "2. Split ciphertext into pairs of letters",
      "3. For each pair, find the corresponding letters in the key square",
      "4. Apply reversed Playfair rules: same row → shift left, same column → shift up, different row/column → form rectangle"
    ];
    
    return isEncrypting ? encryptSteps[activeStep] : decryptSteps[activeStep];
  };

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Playfair Cipher Compiler</h2>
      
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
            <h3 className="font-medium mb-4">Interactive Cipher</h3>
            
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
              <label className="block text-sm text-neutral-400 mb-1">Key</label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                placeholder="Enter key (will be converted to uppercase)"
              />
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
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Output</label>
              <div className="w-full min-h-20 bg-neutral-700 text-neutral-100 p-2 rounded-md break-words font-mono">
                {output}
              </div>
            </div>
          </div>
          
          {/* Visualization Panel */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-2">Visualization</h3>
            
            {/* Key Matrix */}
            <div className="mb-4">
              <h4 className="text-sm text-neutral-400 mb-2">Key Matrix (5x5 Grid)</h4>
              <div className="overflow-x-auto">
                <table className="bg-neutral-700 rounded-md">
                  <tbody>
                    {keyMatrix.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="p-2 text-center border border-neutral-600 w-10 h-10">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-400 mt-1">Note: J is merged with I in the Playfair cipher.</p>
            </div>
            
            {/* Digraphs */}
            <div className="mb-4">
              <h4 className="text-sm text-neutral-400 mb-2">Digraphs (Letter Pairs)</h4>
              <div className="flex flex-wrap gap-2">
                {digraphs.map((digraph, index) => (
                  <div key={index} className="bg-neutral-700 px-3 py-1 rounded-md text-sm">
                    {digraph}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Step by Step Guide */}
            <div>
              <h4 className="text-sm text-neutral-400 mb-2">Step by Step</h4>
              <div className="bg-neutral-700 p-3 rounded-md text-sm mb-2">
                {stepExplanation()}
              </div>
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((step) => (
                  <button
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep === step ? 'bg-orange-500' : 'bg-neutral-700 hover:bg-neutral-600'
                    }`}
                    onClick={() => setActiveStep(step)}
                  >
                    {step + 1}
                  </button>
                ))}
              </div>
            </div>
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
      
      {/* Information Panel */}
      <div className="mt-6 bg-neutral-800 rounded-lg p-4">
        <h3 className="font-medium mb-2">About Playfair Cipher</h3>
        <p className="text-neutral-400">
          The Playfair cipher is a manual symmetric encryption technique invented by Charles Wheatstone in 1854, 
          but named after Lord Playfair who promoted its use. It encrypts pairs of letters (digraphs) instead of 
          single letters, making it significantly harder to break than simple substitution ciphers.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Encryption Rules</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Same row: Each letter is replaced by the letter to its right (cycling at the edge)</li>
              <li>Same column: Each letter is replaced by the letter below it (cycling at the edge)</li>
              <li>Different row and column: Replace with letters at the corners of the rectangle defined by the original pair</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Strengths & Limitations</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Stronger than simple substitution ciphers</li>
              <li>Resistant to simple frequency analysis</li>
              <li>Limited by 25-letter alphabet (J is typically merged with I)</li>
              <li>Vulnerability to known-plaintext attacks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayfairCipherCompiler;