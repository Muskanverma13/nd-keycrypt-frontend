import React, { useState, useEffect } from 'react';

const AESCipherCompiler = () => {
  const [code, setCode] = useState(`// AES (Advanced Encryption Standard) implementation using Web Crypto API
// This demonstrates AES-CBC encryption/decryption with proper key derivation

async function performAESOperation(text, password, isEncrypt) {
  // Convert password to key using PBKDF2
  async function getKeyFromPassword(password, salt) {
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    const saltData = encoder.encode(salt);
    
    // Import the password as a key
    const baseKey = await crypto.subtle.importKey(
      'raw',
      passwordData,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    
    // Derive a key using PBKDF2
    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltData,
        iterations: 100000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-CBC', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  try {
    // Fixed salt and IV for demo purposes - in production, generate these randomly!
    const salt = "AESSaltValue12345";
    const iv = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const key = await getKeyFromPassword(password, salt);
    
    if (isEncrypt) {
      // Encrypt
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv },
        key,
        data
      );
      
      // Convert to base64 for display
      return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    } else {
      // Decrypt
      try {
        // Convert from base64
        const encryptedData = Uint8Array.from(atob(text), c => c.charCodeAt(0));
        
        const decryptedData = await crypto.subtle.decrypt(
          { name: 'AES-CBC', iv },
          key,
          encryptedData
        );
        
        // Convert to string
        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
      } catch (e) {
        return "Decryption failed. Check your password or input.";
      }
    }
  } catch (error) {
    return "Error: " + error.message;
  }
}

// Example usage
async function testAES() {
  const plaintext = "Hello, this is a secure message!";
  const password = "mySecretPassword123";
  
  console.log("Plaintext:", plaintext);
  console.log("Password:", password);
  
  const encrypted = await performAESOperation(plaintext, password, true);
  console.log("Encrypted (Base64):", encrypted);
  
  const decrypted = await performAESOperation(encrypted, password, false);
  console.log("Decrypted:", decrypted);
}

// Run the test
testAES();`);
  
  const [input, setInput] = useState('Hello, this is a secure message!');
  const [password, setPassword] = useState('mySecretPassword123');
  const [output, setOutput] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to run the user's code safely
  const runCode = async () => {
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
      // We need to create a function from the code and then execute it
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const executableCode = new AsyncFunction(code);
      await executableCode();
      
      // Restore console.log
      console.log = originalConsoleLog;
      
      // Update console output
      setConsoleOutput(logs);
    } catch (error) {
      setConsoleOutput([`Error: ${error.message}`]);
    }
  };

  // Function to encrypt/decrypt based on current settings
  const processText = async () => {
    if (!input || !password) return;
    
    setIsProcessing(true);
    try {
      // Create a function for AES encryption/decryption
      async function performAESOperation(text, password, isEncrypt) {
        // Convert password to key using PBKDF2
        async function getKeyFromPassword(password, salt) {
          const encoder = new TextEncoder();
          const passwordData = encoder.encode(password);
          const saltData = encoder.encode(salt);
          
          // Import the password as a key
          const baseKey = await crypto.subtle.importKey(
            'raw',
            passwordData,
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
          );
          
          // Derive a key using PBKDF2
          return await crypto.subtle.deriveKey(
            {
              name: 'PBKDF2',
              salt: saltData,
              iterations: 100000,
              hash: 'SHA-256'
            },
            baseKey,
            { name: 'AES-CBC', length: 256 },
            false,
            ['encrypt', 'decrypt']
          );
        }
        
        // Fixed salt and IV for demo purposes
        const salt = "AESSaltValue12345";
        const iv = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        const key = await getKeyFromPassword(password, salt);
        
        if (isEncrypt) {
          // Encrypt
          const encoder = new TextEncoder();
          const data = encoder.encode(text);
          
          const encryptedData = await crypto.subtle.encrypt(
            { name: 'AES-CBC', iv },
            key,
            data
          );
          
          // Convert to base64 for display
          return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
        } else {
          // Decrypt
          try {
            // Convert from base64
            const encryptedData = Uint8Array.from(atob(text), c => c.charCodeAt(0));
            
            const decryptedData = await crypto.subtle.decrypt(
              { name: 'AES-CBC', iv },
              key,
              encryptedData
            );
            
            // Convert to string
            const decoder = new TextDecoder();
            return decoder.decode(decryptedData);
          } catch (e) {
            return "Decryption failed. Check your password or input.";
          }
        }
      }
      
      const result = await performAESOperation(input, password, isEncrypting);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    setIsProcessing(false);
  };

  // Process text when user clicks the process button
  const handleProcessClick = () => {
    processText();
  };

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">AES Cipher Compiler</h2>
      
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
            <h3 className="font-medium mb-4">Interactive AES Cipher</h3>
            
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
              <label className="block text-sm text-neutral-400 mb-1">Password</label>
              <input
                type="text"
                className="w-full bg-neutral-700 text-neutral-100 p-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-neutral-400 mb-1">Input Text</label>
              <textarea
                className="w-full h-20 bg-neutral-700 text-neutral-100 p-2 rounded-md resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isEncrypting ? "Enter text to encrypt" : "Enter base64 to decrypt"}
              />
            </div>
            
            <button 
              onClick={handleProcessClick}
              disabled={isProcessing}
              className="w-full mb-4 bg-orange-500 hover:bg-orange-500 px-4 py-2 rounded-md font-medium transition-colors disabled:bg-blue-800 disabled:opacity-70"
            >
              {isProcessing ? 'Processing...' : isEncrypting ? 'Encrypt' : 'Decrypt'}
            </button>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Output</label>
              <div className="w-full min-h-20 bg-neutral-700 text-neutral-100 p-2 rounded-md break-words font-mono overflow-auto max-h-40">
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
        <h3 className="font-medium mb-2">About AES Cipher</h3>
        <p className="text-neutral-400">
          The Advanced Encryption Standard (AES) is a symmetric encryption algorithm and one of the most secure
          encryption methods widely used today. It was established by the U.S. National Institute of Standards 
          and Technology (NIST) in 2001 and is now used worldwide.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Advantages</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Very secure encryption strength</li>
              <li>Fast implementation in hardware/software</li>
              <li>Widely adopted global standard</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1 text-neutral-300">Limitations</h4>
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Requires secure key management</li>
              <li>Implementation complexity risks</li>
              <li>Vulnerable to side-channel attacks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AESCipherCompiler;