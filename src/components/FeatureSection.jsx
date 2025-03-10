import { useState } from "react";

const Features = () => {
  const [activeSection, setActiveSection] = useState("interactive");
  const [activeAlgorithm, setActiveAlgorithm] = useState(null);
  const [inputText, setInputText] = useState("Hello");
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  // Symmetric and Asymmetric Algorithms List
  const symmetricAlgorithms = [
    { 
      name: "Caesar Cipher", 
      video: "https://www.youtube.com/embed/video1",
      encrypt: (text, key = 3) => {
        return text.split('').map(char => {
          if (!/[a-zA-Z]/.test(char)) return char;
          
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          return String.fromCharCode(((code - offset + key) % 26) + offset);
        }).join('');
      },
      decrypt: (text, key = 3) => {
        return text.split('').map(char => {
          if (!/[a-zA-Z]/.test(char)) return char;
          
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          return String.fromCharCode(((code - offset - key + 26) % 26) + offset);
        }).join('');
      }
    },
    { 
      name: "Transposition Cipher", 
      video: "https://www.youtube.com/embed/video2",
      encrypt: (text, key = 3) => {
        const columns = [];
        for (let i = 0; i < key; i++) {
          columns.push([]);
        }
        
        for (let i = 0; i < text.length; i++) {
          const column = i % key;
          columns[column].push(text[i]);
        }
        
        return columns.flat().join('');
      },
      decrypt: (text, key = 3) => {
        if (!text) return '';
        const numRows = Math.ceil(text.length / key);
        const numColumns = key;
        const numFilledCells = text.length;
        const numEmptyCells = (numRows * numColumns) - numFilledCells;
        
        const columns = [];
        let textIndex = 0;
        
        for (let i = 0; i < numColumns; i++) {
          const column = [];
          for (let j = 0; j < numRows; j++) {
            if (i >= numColumns - numEmptyCells && j === numRows - 1) {
              column.push('');
            } else {
              column.push(text[textIndex++]);
            }
          }
          columns.push(column);
        }
        
        let result = '';
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numColumns; col++) {
            if (columns[col][row]) {
              result += columns[col][row];
            }
          }
        }
        
        return result;
      }
    },
    { 
      name: "Playfair Cipher", 
      video: "https://www.youtube.com/embed/video3",
      encrypt: (text) => {
        // Simplified implementation
        return text.split('').reverse().join(''); 
      },
      decrypt: (text) => {
        // Simplified implementation
        return text.split('').reverse().join('');
      }
    },
    { 
      name: "3DES", 
      video: "https://www.youtube.com/embed/video4",
      encrypt: (text) => {
        // Simplified implementation
        return btoa(text);
      },
      decrypt: (text) => {
        try {
          return atob(text);
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "AES", 
      video: "https://www.youtube.com/embed/video5",
      encrypt: (text) => {
        // Simplified implementation for demo only
        return btoa(text);
      },
      decrypt: (text) => {
        try {
          return atob(text);
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
  ];

  const asymmetricAlgorithms = [
    { 
      name: "RSA", 
      video: "https://www.youtube.com/embed/video6",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==RSA==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==RSA==")) return "Invalid RSA ciphertext";
        try {
          return atob(text.replace("==RSA==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "ECC", 
      video: "https://www.youtube.com/embed/video7",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==ECC==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==ECC==")) return "Invalid ECC ciphertext";
        try {
          return atob(text.replace("==ECC==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "EDDSA", 
      video: "https://www.youtube.com/embed/video8",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==EDDSA==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==EDDSA==")) return "Invalid EDDSA ciphertext";
        try {
          return atob(text.replace("==EDDSA==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "Diffie-Hellman", 
      video: "https://www.youtube.com/embed/video9",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==DH==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==DH==")) return "Invalid Diffie-Hellman ciphertext";
        try {
          return atob(text.replace("==DH==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "Crystals-Kyber", 
      video: "https://www.youtube.com/embed/video10",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==KYBER==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==KYBER==")) return "Invalid Kyber ciphertext";
        try {
          return atob(text.replace("==KYBER==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
  ];

  // Theory topics for descriptive section
  const theoryTopics = [
    "Cryptography Basics",
    "Symmetric Encryption Principles",
    "Asymmetric Encryption Principles",
    "Hash Functions",
    "Digital Signatures",
    "Key Management",
    "Cryptanalysis",
    "Quantum Cryptography",
    "Blockchain Cryptography"
  ];

  // Helper function to get current algorithm selected
  const getCurrentAlgorithm = () => {
    if (!selectedAlgo) return null;
    
    if (activeAlgorithm === "symmetric") {
      return symmetricAlgorithms.find(algo => algo.name === selectedAlgo);
    } else {
      return asymmetricAlgorithms.find(algo => algo.name === selectedAlgo);
    }
  };

  // Calculate encrypted and decrypted text based on input and selected algorithm
  const getEncryptedText = () => {
    const algo = getCurrentAlgorithm();
    if (!algo || !inputText) return "";
    return algo.encrypt(inputText);
  };

  const getDecryptedText = () => {
    const algo = getCurrentAlgorithm();
    if (!algo) return "";
    const encrypted = getEncryptedText();
    return algo.decrypt(encrypted);
  };

  return (
    <div className="features-container py-24 px-8 text-white">
      {/* Header Section with Better Spacing */}
      <div className="text-center mb-20">
        <span className="inline-block bg-neutral-800 text-orange-500 rounded-full text-sm font-medium px-6 py-2 uppercase mb-8">
          Features
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wider mb-10">
          Interactive Crypto{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            Learning Hub
          </span>
        </h2>
        <p className="max-w-3xl mx-auto text-neutral-400 text-lg leading-relaxed">
          Explore, learn, and experiment with symmetric and asymmetric encryption techniques
        </p>
      </div>

      {/* Main Section Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <button
          onClick={() => {
            setActiveSection("interactive");
            setSelectedAlgo(null);
          }}
          className={`px-8 py-4 border border-orange-500 rounded-full font-medium transition-all duration-300 ${
            activeSection === "interactive" 
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white" 
              : "bg-transparent text-orange-500 hover:bg-orange-500/10"
          }`}
        >
          Interactive Learning
        </button>
        <button
          onClick={() => {
            setActiveSection("visual");
            setSelectedAlgo(null);
          }}
          className={`px-8 py-4 border border-orange-500 rounded-full font-medium transition-all duration-300 ${
            activeSection === "visual" 
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white" 
              : "bg-transparent text-orange-500 hover:bg-orange-500/10"
          }`}
        >
          Visual Learners
        </button>
        <button
          onClick={() => {
            setActiveSection("descriptive");
            setSelectedAlgo(null);
          }}
          className={`px-8 py-4 border border-orange-500 rounded-full font-medium transition-all duration-300 ${
            activeSection === "descriptive" 
              ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white" 
              : "bg-transparent text-orange-500 hover:bg-orange-500/10"
          }`}
        >
          Descriptive
        </button>
      </div>

      {/* Interactive Section - Now with encryption demos */}
      {activeSection === "interactive" && (
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-12">Try Encryption Algorithms</h3>
          
          {!activeAlgorithm && (
            <div className="flex flex-wrap justify-center gap-10 mb-16">
              <button
                onClick={() => setActiveAlgorithm("symmetric")}
                className="px-8 py-6 border-2 border-amber-600 rounded-lg font-medium transition-all duration-500 
                  bg-neutral-900/80 hover:bg-amber-800/20 text-amber-400 shadow-lg hover:shadow-amber-500/20 w-64"
              >
                <div className="text-3xl mb-2"></div>
                <div className="text-xl font-semibold mb-2">Symmetric</div>
                <div className="text-sm text-neutral-400">Same key for encryption and decryption</div>
              </button>
              
              <button
                onClick={() => setActiveAlgorithm("asymmetric")}
                className="px-8 py-6 border-2 border-amber-600 rounded-lg font-medium transition-all duration-500 
                  bg-neutral-900/80 hover:bg-amber-800/20 text-amber-400 shadow-lg hover:shadow-amber-500/20 w-64"
              >
                {/* <div className="text-3xl mb-2"></div> */}
                <div className="text-xl font-semibold mb-2">Asymmetric</div>
                <div className="text-sm text-neutral-400">Public/private key pairs</div>
              </button>
            </div>
          )}

          {/* Algorithm Selection */}
          {activeAlgorithm && !selectedAlgo && (
            <div>
              <div className="flex justify-center mb-10">
                <button 
                  onClick={() => setActiveAlgorithm(null)}
                  className="text-orange-500 hover:text-orange-400 flex items-center gap-2"
                >
                  <span>←</span> Back to encryption types
                </button>
              </div>
              
              <h4 className="text-2xl font-semibold text-center mb-8 text-orange-500">
                {activeAlgorithm === "symmetric" ? "Symmetric Algorithms" : "Asymmetric Algorithms"}
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
                {(activeAlgorithm === "symmetric" ? symmetricAlgorithms : asymmetricAlgorithms).map((algo, index) => (
                  <div
                    key={index}
                    className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-800/50 shadow-md 
                      hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedAlgo(algo.name)}
                  >
                    <h4 className="font-bold text-xl py-4 px-6 bg-neutral-900 text-orange-500 group-hover:bg-orange-500 
                      group-hover:text-white transition-colors duration-300">{algo.name}</h4>
                    <div className="p-5">
                      <p className="text-neutral-300 text-center mb-3">Try this algorithm</p>
                      <div className="bg-neutral-900 p-4 rounded-lg flex justify-center items-center h-16">
                        <span className="text-2xl">{algo.icon}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Demo for Selected Algorithm */}
          {activeAlgorithm && selectedAlgo && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-10">
                <button 
                  onClick={() => setSelectedAlgo(null)}
                  className="text-orange-500 hover:text-orange-400 flex items-center gap-2"
                >
                  <span>←</span> Back to algorithm selection
                </button>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-8 shadow-lg">
                <h4 className="text-2xl font-semibold mb-8 text-orange-500 text-center">{selectedAlgo}</h4>
                
                <div className="mb-8">
                  <label className="block text-neutral-300 mb-2 font-medium">Your Message</label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white"
                    placeholder="Enter text to encrypt"
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-neutral-300 mb-2 font-medium">Encrypted Result</label>
                  <div className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-orange-400 font-mono">
                    {getEncryptedText() || "Enter text above to see encryption"}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-neutral-300 mb-2 font-medium">Decrypted Result</label>
                  <div className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-teal-400 font-mono">
                    {getDecryptedText() || "Enter text above to see decryption"}
                  </div>
                </div>
                
                <div className="mt-8 bg-neutral-800/50 rounded-lg p-4">
                  <h5 className="font-medium text-orange-500 mb-2">How {selectedAlgo} Works</h5>
                  <p className="text-neutral-400 text-sm">
                    {activeAlgorithm === "symmetric"
                      ? "This symmetric algorithm uses the same key for both encryption and decryption processes."
                      : "This asymmetric algorithm uses different keys for encryption (public key) and decryption (private key)."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Visual Learners Section */}
      {activeSection === "visual" && (
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-12">Choose Encryption Type</h3>
          <div className="flex flex-wrap justify-center gap-10 mb-16">
            <button
              onClick={() => setActiveAlgorithm("symmetric")}
              className={`
                px-8 py-4 border-2 rounded-lg font-medium transition-all duration-500 
                relative overflow-hidden shadow-lg
                ${
                  activeAlgorithm === "symmetric" 
                    ? "border-teal-500 text-white" 
                    : "border-teal-600 text-teal-400 hover:text-white"
                }
              `}
              style={{
                background: activeAlgorithm === "symmetric" 
                  ? "linear-gradient(135deg, #2dd4bf, #0f766e)" 
                  : "rgba(13, 148, 136, 0.2)"
              }}
            >
              <span className="relative z-10">Symmetric Encryption</span>
              {activeAlgorithm === "symmetric" && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white animate-ping"></span>
              )}
            </button>
            <button
              onClick={() => setActiveAlgorithm("asymmetric")}
              className={`
                px-8 py-4 border-2 rounded-lg font-medium transition-all duration-500 
                relative overflow-hidden shadow-lg
                ${
                  activeAlgorithm === "asymmetric" 
                    ? "border-amber-500 text-white" 
                    : "border-amber-600 text-amber-400 hover:text-white"
                }
              `}
              style={{
                background: activeAlgorithm === "asymmetric" 
                  ? "linear-gradient(135deg, #f59e0b, #d97706)" 
                  : "rgba(217, 119, 6, 0.2)"
              }}
            >
              <span className="relative z-10">Asymmetric Encryption</span>
              {activeAlgorithm === "asymmetric" && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white animate-ping"></span>
              )}
            </button>
          </div>

          {/* Algorithm List */}
          {activeAlgorithm && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center mb-10 text-orange-500">
                {activeAlgorithm === "symmetric" ? "Symmetric Algorithms" : "Asymmetric Algorithms"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
                {(activeAlgorithm === "symmetric" ? symmetricAlgorithms : asymmetricAlgorithms).map((algo, index) => (
                  <div key={index} className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-800 shadow-md hover:shadow-orange-500/10 transition-all duration-300">
                    <h4 className="font-bold text-xl py-4 px-6 bg-neutral-900 text-orange-500">{algo.name}</h4>
                    <div className="p-6">
                      <div className="mb-5 bg-neutral-900 rounded overflow-hidden">
                        <iframe
                          className="w-full h-56"
                          src={algo.video}
                          title={algo.name}
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="mt-6 bg-neutral-900 p-5 rounded-lg">
                        <p className="text-base font-semibold text-orange-400 mb-3">Encryption & Decryption</p>
                        <p className="text-sm text-neutral-300 mb-2">Example: Encrypting 'HELLO' → 'IFMMP'</p>
                        <p className="text-sm text-neutral-300">Decrypting 'IFMMP' → 'HELLO'</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Descriptive Section */}
      {activeSection === "descriptive" && (
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-orange-500 mb-10">Cryptography Theory</h3>
          <p className="text-center text-neutral-400 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
            Explore the theoretical foundations of cryptography with our comprehensive guides covering key concepts and principles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {theoryTopics.map((topic, index) => (
              <div key={index} className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-800 shadow-md hover:shadow-orange-500/10 transition-all duration-300">
                <h4 className="font-bold text-xl py-4 px-6 bg-neutral-900 text-orange-500">{topic}</h4>
                <div className="p-6">
                  <div className="bg-neutral-900 p-5 rounded-lg mb-6">
                    <p className="text-base text-neutral-400 leading-relaxed">
                      Comprehensive theory and principles about {topic.toLowerCase()}.
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-700">
                    <button className="w-full py-3 bg-neutral-900 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300 text-base">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Features;