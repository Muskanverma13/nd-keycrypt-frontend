import React, { useState, useEffect } from 'react';

const TranspositionCipherCompiler = () => {
  const [code, setCode] = useState(`// Transposition Cipher implementation
// Try modifying the key or input text

function transpositionEncrypt(text, key) {
  // Remove spaces to simplify (optional based on your needs)
  const normalizedText = text.replace(/\\s/g, '');
  
  // Calculate number of rows needed
  const numRows = Math.ceil(normalizedText.length / key);
  
  // Create the grid for transposition
  const grid = Array(numRows).fill().map(() => Array(key).fill(''));
  
  // Fill the grid with characters from the text
  let charIndex = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < key; col++) {
      if (charIndex < normalizedText.length) {
        grid[row][col] = normalizedText[charIndex++];
      }
    }
  }
  
  // Read out the columns to get encrypted text
  let encrypted = '';
  for (let col = 0; col < key; col++) {
    for (let row = 0; row < numRows; row++) {
      encrypted += grid[row][col] || '';
    }
  }
  
  return encrypted;
}

function transpositionDecrypt(text, key) {
  // Calculate the dimensions of the grid
  const numRows = Math.ceil(text.length / key);
  const numCols = key;
  
  // Calculate the number of filled cells
  const filledCells = text.length;
  
  // Create the grid for transposition
  const grid = Array(numRows).fill().map(() => Array(numCols).fill(''));
  
  // Calculate cells in the grid
  let charIndex = 0;
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      if (row * numCols + col < filledCells) {
        grid[row][col] = text[charIndex++];
      }
    }
  }
  
  // Read out the rows to get decrypted text
  let decrypted = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      decrypted += grid[row][col] || '';
    }
  }
  
  return decrypted;
}

// Example usage
const plaintext = "DEFENDTHEEASTWALL";
const key = 4;
const encrypted = transpositionEncrypt(plaintext, key);
const decrypted = transpositionDecrypt(encrypted, key);

console.log("Plaintext:", plaintext);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);`);
  
  const [input, setInput] = useState('DEFEND THE EAST WALL');
  const [key, setKey] = useState(4);
  const [output, setOutput] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [visualGrid, setVisualGrid] = useState([]);

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

  // Function to create visualization grid
  const createVisualGrid = (text, key, encrypting) => {
    const normalizedText = text.replace(/\s/g, '');
    const numCols = key;
    const numRows = Math.ceil(normalizedText.length / numCols);
    
    const grid = Array(numRows).fill().map(() => Array(numCols).fill(''));
    
    let charIndex = 0;
    
    if (encrypting) {
      // Fill grid row by row for encryption
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          if (charIndex < normalizedText.length) {
            grid[row][col] = normalizedText[charIndex++];
          }
        }
      }
    } else {
      // Fill grid column by column for decryption visualization
      for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
          if (charIndex < normalizedText.length && row * numCols + col < normalizedText.length) {
            grid[row][col] = normalizedText[charIndex++];
          }
        }
      }
    }
    
    return grid;
  };

  // Function to encrypt/decrypt based on current settings
  const processText = () => {
    try {
      const normalizedInput = input.replace(/\s/g, '');
      
      if (isEncrypting) {
        // Create visual grid for encryption
        const grid = createVisualGrid(normalizedInput, key, true);
        setVisualGrid(grid);
        
        // Create transposed result
        let result = '';
        for (let col = 0; col < key; col++) {
          for (let row = 0; row < grid.length; row++) {
            result += grid[row][col] || '';
          }
        }
        setOutput(result);
      } else {
        // For decryption
        const numRows = Math.ceil(normalizedInput.length / key);
        
        // Create visual grid for how the ciphertext is arranged (column by column)
        const grid = createVisualGrid(normalizedInput, key, false);
        setVisualGrid(grid);
        
        // Read out row by row for decryption
        let result = '';
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < key; col++) {
            result += grid[row][col] || '';
          }
        }
        setOutput(result);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  // Process text whenever input or key changes
  useEffect(() => {
    processText();
  }, [input, key, isEncrypting]);

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Transposition Cipher Compiler</h2>
      
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
              <label className="block text-sm text-neutral-400 mb-1">Key (Number of Columns)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={key}
                  onChange={(e) => setKey(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-lg font-medium w-8 text-center">{key}</span>
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
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Output</label>
              <div className="w-full min-h-20 bg-neutral-700 text-neutral-100 p-2 rounded-md break-words font-mono">
                {output}
              </div>
            </div>
          </div>
          
          {/* Visualization Grid */}
          <div className="bg-neutral-800 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-2">Visualization</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {Array.from({ length: key }, (_, i) => (
                      <th key={i} className="border border-neutral-600 p-2 text-center">
                        Col {i+1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visualGrid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-neutral-600 p-2 text-center">
                          {cell || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-xs text-neutral-400">
              {isEncrypting ? 
                "Encryption: Fill grid row by row, then read column by column" : 
                "Decryption: Fill grid column by column, then read row by row"}
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
        <h3 className="font-medium mb-2">About Transposition Cipher</h3>
        <p className="text-neutral-400">
          The Transposition Cipher rearranges the order of characters in the plaintext without changing the actual characters themselves. 
          In a columnar transposition, the plaintext is written out in rows of a fixed length, and then the ciphertext is created by reading down the columns.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Advantages</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>More secure than simple substitution ciphers</li>
              <li>Can be combined with other cipher methods</li>
              <li>Frequency analysis alone cannot break it</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Limitations</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Still vulnerable to cryptanalysis methods</li>
              <li>Multiple rounds needed for better security</li>
              <li>Can be broken with enough ciphertext samples</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranspositionCipherCompiler;