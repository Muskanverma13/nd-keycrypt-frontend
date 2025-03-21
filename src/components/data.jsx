// data.jsx - Cryptography algorithms, topics, and related data

// Symmetric Algorithms List
export const symmetricAlgorithms = [
  // {
  //   name: "Symmetric ",
  //   Video: "https://www.youtube.com/embed/Q0Rp8yX5qEk?si=JEd_1IevAuJqYJTo"
  // },
    { 
      name: "Caesar Cipher", 
      video: "https://www.youtube.com/embed/sMOZf4GN3oc?si=cULJb5Tq4qt0YaYn",
      description: "Caesar cipher shifts letters by a fixed number, wrapping around the alphabet cyclically.",
      example: "Encrypting 'HELLO' → 'IFMMP', Decrypting 'IFMMP' → 'HELLO'",
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
      video: "https://www.youtube.com/embed/bcyUJK1BvHw?si=H7n1aLz6JQRoOWXd",
      description: "This symmetric algorithm uses the same key for both encryption and decryption processes.",
      example: "Example: Encrypting 'HELLO' by rearranging characters based on columns",
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
      video: "https://www.youtube.com/embed/quKhvu2tPy8?si=8M60o9WUPgkEZNaN",
      description: "This symmetric algorithm uses the same key for both encryption and decryption processes.",
      example: "Example: Uses a 5x5 grid of letters for encryption and decryption",
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
      video: "https://www.youtube.com/embed/-tRekrZJyBQ?si=zB-ylJtXIwVRKB32",
      description: "This symmetric algorithm uses the same key for both encryption and decryption processes.",
      example: "Triple Data Encryption Standard with multiple rounds of encryption",
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
      video: "https://www.youtube.com/embed/gP4PqVGudtg?si=xWc3j1GLv9AZD9YM",
      description: "This symmetric algorithm uses the same key for both encryption and decryption processes.",
      example: "Advanced Encryption Standard - industry standard for secure encryption",
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
  
  // Asymmetric Algorithms List
  export const asymmetricAlgorithms = [
    { 
      name: "RSA", 
      video: "https://www.youtube.com/embed/wcbH4t5SJpg?si=2n-1aaYlen-HS0eb",
      description: "This asymmetric algorithm uses different keys for encryption (public key) and decryption (private key).",
      example: "Uses large prime numbers for secure key generation",
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
      video: "https://www.youtube.com/embed/rzSU2m8oN48?si=EXq7RN4DbXRdZqK1",
      description: "This asymmetric algorithm uses different keys for encryption (public key) and decryption (private key).",
      example: "Elliptic Curve Cryptography - efficient for mobile and constrained devices",
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
      name: "EdDSA", 
      video: "https://www.youtube.com/embed/78I0xRqdpn0?si=r64A09SLphQ-ErMt",
      description: "This asymmetric algorithm uses different keys for encryption (public key) and decryption (private key).",
      example: "Edwards-curve Digital Signature Algorithm - for secure digital signatures",
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
      video: "https://www.youtube.com/embed/85oMrKd8afY?si=GhGS_kb1L2i778sF",
      description: "This asymmetric algorithm enables secure key exchange over an insecure channel.",
      example: "Allows two parties to establish a shared secret key over an insecure channel",
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
      name: "CRYSTALS-Kyber", 
      video: "https://www.youtube.com/embed/video10",
      description: "This post-quantum asymmetric algorithm is designed to be secure against quantum computing attacks.",
      example: "NIST-approved post-quantum key encapsulation mechanism",
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
  export const theoryTopics = [
    {
      name: "Cryptography Basics",
      description: "Comprehensive theory and principles about cryptography basics.",
      topics: ["History of Cryptography", "Modern Applications", "Core Concepts"]
    },
    {
      name: "Symmetric Encryption Principles",
      description: "Comprehensive theory and principles about symmetric encryption principles.",
      topics: ["Block Ciphers", "Stream Ciphers", "Key Management"]
    },
    {
      name: "Asymmetric Encryption Principles",
      description: "Comprehensive theory and principles about asymmetric encryption principles.",
      topics: ["Public Key Infrastructure", "Digital Certificates", "Key Distribution"]
    },
    {
      name: "Hash Functions",
      description: "Comprehensive theory and principles about hash functions.",
      topics: ["Collision Resistance", "SHA Family", "Applications in Authentication"]
    },
    {
      name: "Digital Signatures",
      description: "Comprehensive theory and principles about digital signatures.",
      topics: ["Non-repudiation", "Signature Algorithms", "Authentication Applications"]
    },
    {
      name: "Key Management",
      description: "Comprehensive theory and principles about key management.",
      topics: ["Key Generation", "Distribution", "Storage", "Rotation"]
    },
    {
      name: "Cryptanalysis",
      description: "Comprehensive theory and principles about cryptanalysis.",
      topics: ["Attack Vectors", "Historical Breakthroughs", "Defensive Strategies"]
    },
    {
      name: "Quantum Cryptography",
      description: "Comprehensive theory and principles about quantum cryptography.",
      topics: ["Quantum Key Distribution", "Post-Quantum Algorithms", "Future Challenges"]
    },
    {
      name: "Blockchain Cryptography",
      description: "Comprehensive theory and principles about blockchain cryptography.",
      topics: ["Consensus Mechanisms", "Digital Ledgers", "Smart Contracts Security"]
    }
  ];
  
  // Section options for the features component
  export const sectionOptions = [
    { 
      id: "interactive", 
      label: "Interactive Learning", 
      description: "Try encryption algorithms hands-on",
      icon: "🔄"
    },
    { 
      id: "visual", 
      label: "Visual Learners", 
      description: "Learn through videos and visualizations",
      icon: "👁️"
    },
    { 
      id: "descriptive", 
      label: "Descriptive", 
      description: "Read in-depth theory and principles",
      icon: "📚"
    }
  ];
  
  // Algorithm type options
  export const algorithmTypes = [
    {
      id: "symmetric",
      label: "Symmetric",
      description: "Same key for encryption and decryption",
      color: "amber"
    },
    {
      id: "asymmetric",
      label: "Asymmetric",
      description: "Public/private key pairs",
      color: "amber"
    }
  ];
  
  // Helper function to get an algorithm by name
  export const getAlgorithmByName = (name, type) => {
    const algorithmsList = type === "symmetric" ? symmetricAlgorithms : asymmetricAlgorithms;
    return algorithmsList.find(algo => algo.name === name);
  };
  
  // Helper function to get algorithm list by type
  export const getAlgorithmsByType = (type) => {
    return type === "symmetric" ? symmetricAlgorithms : asymmetricAlgorithms;
  };
  
  // Helper function to encrypt text
  export const getEncryptedText = (text, algorithm, type) => {
    if (!text || !algorithm) return "";
    const algo = getAlgorithmByName(algorithm, type);
    if (!algo) return "";
    return algo.encrypt(text);
  };
  
  // Helper function to decrypt text
  export const getDecryptedText = (text, algorithm, type) => {
    if (!text || !algorithm) return "";
    const algo = getAlgorithmByName(algorithm, type);
    if (!algo) return "";
    const encrypted = getEncryptedText(text, algorithm, type);
    return algo.decrypt(encrypted);
  };
  
  // Default texts for demonstration
  export const defaultInputText = "Hello";
  
  // Color themes for different algorithm types
  export const colorThemes = {
    symmetric: {
      primary: "teal-500",
      secondary: "teal-600",
      gradient: "from-teal-500 to-teal-700",
      background: "rgba(13, 148, 136, 0.2)",
      activeBackground: "linear-gradient(135deg, #2dd4bf, #0f766e)"
    },
    asymmetric: {
      primary: "amber-500",
      secondary: "amber-600",
      gradient: "from-amber-500 to-amber-700",
      background: "rgba(217, 119, 6, 0.2)",
      activeBackground: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    default: {
      primary: "orange-500",
      secondary: "orange-700",
      gradient: "from-orange-500 to-orange-700",
      background: "rgba(234, 88, 12, 0.1)",
      activeBackground: "linear-gradient(135deg, #f97316, #c2410c)"
    }
  };