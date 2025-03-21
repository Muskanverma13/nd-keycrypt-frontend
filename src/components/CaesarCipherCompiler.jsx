import React, { useState, useEffect } from 'react';

const CaesarCipherCompiler = () => {
  const [code, setCode] = useState(`// Caesar Cipher implementation
// Try modifying the shift value or input text

function caesarCipher(text, shift) {
  // Ensure shift is between 0-25
  shift = shift % 26;
  
  // Convert string to array, map each character, then join back to string
  return text.split('').map(char => {
    // Get ASCII code
    const code = char.charCodeAt(0);
    
    // Handle uppercase letters (ASCII 65-90)
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    }
    
    // Handle lowercase letters (ASCII 97-122)
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    
    // Return unchanged if not a letter
    return char;
  }).join('');
}

// Example usage
const plaintext = "Hello, World!";
const shift = 3;
const encrypted = caesarCipher(plaintext, shift);
const decrypted = caesarCipher(encrypted, 26 - shift);

console.log("Plaintext:", plaintext);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);`);
  
  const [input, setInput] = useState('Hello, World!');
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);
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

  // Function to encrypt/decrypt based on current settings
  const processText = () => {
    try {
      const shiftValue = isEncrypting ? shift : 26 - shift;
      
      // Create a function from the essential part of the caesarCipher logic
      const caesarCipher = (text, shift) => {
        shift = shift % 26;
        return text.split('').map(char => {
          const code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
          }
          if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
          }
          return char;
        }).join('');
      };
      
      const result = caesarCipher(input, shiftValue);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  // Process text whenever input or shift changes
  useEffect(() => {
    processText();
  }, [input, shift, isEncrypting]);

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Caesar Cipher Compiler</h2>
      
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
              <label className="block text-sm text-neutral-400 mb-1">Shift Value</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={shift}
                  onChange={(e) => setShift(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-lg font-medium w-8 text-center">{shift}</span>
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
        <h3 className="font-medium mb-2">About Caesar Cipher</h3>
        <p className="text-neutral-400">
          The Caesar Cipher is one of the simplest and most widely known encryption techniques. 
          It is a type of substitution cipher in which each letter in the plaintext is replaced 
          by a letter some fixed number of positions down the alphabet. For example, with a 
          shift of 3, A would be replaced by D, B would become E, and so on.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Advantages</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Simple to understand and implement</li>
              <li>Fast encryption and decryption</li>
              <li>No special equipment needed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Limitations</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Very weak security (only 25 possible keys)</li>
              <li>Vulnerable to frequency analysis</li>
              <li>No protection against known-plaintext attacks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaesarCipherCompiler;